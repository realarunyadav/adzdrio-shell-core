-- 1. CURRENCY INTEGRITY FUNCTION
CREATE OR REPLACE FUNCTION public.check_finance_currency_integrity()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    parent_currency text;
BEGIN
    IF NEW.sale_id IS NOT NULL THEN
        SELECT currency INTO parent_currency FROM public.sales WHERE id = NEW.sale_id;
        IF parent_currency IS NOT NULL AND NEW.currency != parent_currency THEN
            RAISE EXCEPTION 'Currency mismatch: Transaction currency (%) does not match Sale currency (%)', NEW.currency, parent_currency;
        END IF;
    END IF;

    IF NEW.subscription_id IS NOT NULL THEN
        SELECT currency INTO parent_currency FROM public.sales_subscriptions WHERE id = NEW.subscription_id;
        IF parent_currency IS NOT NULL AND NEW.currency != parent_currency THEN
            RAISE EXCEPTION 'Currency mismatch: Transaction currency (%) does not match Subscription currency (%)', NEW.currency, parent_currency;
        END IF;
    END IF;

    RETURN NEW;
END;
$$;

-- Apply currency integrity to transactions
DROP TRIGGER IF EXISTS tr_finance_transaction_currency_integrity ON public.finance_transactions;
CREATE TRIGGER tr_finance_transaction_currency_integrity
    BEFORE INSERT OR UPDATE ON public.finance_transactions
    FOR EACH ROW EXECUTE FUNCTION public.check_finance_currency_integrity();

-- Apply currency integrity to invoices
CREATE OR REPLACE FUNCTION public.check_invoice_currency_integrity()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    parent_currency text;
BEGIN
    IF NEW.sale_id IS NOT NULL THEN
        SELECT currency INTO parent_currency FROM public.sales WHERE id = NEW.sale_id;
        IF parent_currency IS NOT NULL AND NEW.currency != parent_currency THEN
            RAISE EXCEPTION 'Currency mismatch: Invoice currency (%) does not match Sale currency (%)', NEW.currency, parent_currency;
        END IF;
    END IF;

    IF NEW.subscription_id IS NOT NULL THEN
        SELECT currency INTO parent_currency FROM public.sales_subscriptions WHERE id = NEW.subscription_id;
        IF parent_currency IS NOT NULL AND NEW.currency != parent_currency THEN
            RAISE EXCEPTION 'Currency mismatch: Invoice currency (%) does not match Subscription currency (%)', NEW.currency, parent_currency;
        END IF;
    END IF;

    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS tr_finance_invoice_currency_integrity ON public.finance_invoices;
CREATE TRIGGER tr_finance_invoice_currency_integrity
    BEFORE INSERT OR UPDATE ON public.finance_invoices
    FOR EACH ROW EXECUTE FUNCTION public.check_invoice_currency_integrity();

-- 2. AMOUNT / BALANCE PROTECTION & STATUS SYNC
CREATE OR REPLACE FUNCTION public.sync_finance_lifecycle()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_total_amount numeric;
    v_collected_total numeric;
    v_refunded_total numeric;
    v_sale_status text;
    v_invoice_status text;
    v_due_date date;
BEGIN
    IF NEW.sale_id IS NOT NULL THEN
        -- 1. LOCK the sale row for concurrency safety
        SELECT final_amount, status INTO v_total_amount, v_sale_status 
        FROM public.sales 
        WHERE id = NEW.sale_id
        FOR UPDATE;

        -- 2. Calculate current completed totals
        SELECT 
            COALESCE(SUM(amount) FILTER (WHERE type = 'payment' AND status = 'completed'), 0),
            COALESCE(SUM(amount) FILTER (WHERE type = 'refund' AND status = 'completed'), 0)
        INTO v_collected_total, v_refunded_total
        FROM public.finance_transactions
        WHERE sale_id = NEW.sale_id;

        -- 3. VALIDATE BALANCE
        IF NEW.status = 'completed' THEN
            IF NEW.type = 'payment' THEN
                IF v_collected_total > v_total_amount THEN
                    RAISE EXCEPTION 'Over-payment rejected: Total collected (%) exceeds Sale amount (%)', v_collected_total, v_total_amount;
                END IF;
            ELSIF NEW.type = 'refund' THEN
                IF v_refunded_total > v_collected_total THEN
                    RAISE EXCEPTION 'Over-refund rejected: Total refunded (%) exceeds Collected amount (%)', v_refunded_total, v_collected_total;
                END IF;
            END IF;
        END IF;

        -- 4. SYNC SALE STATUS
        IF v_collected_total >= v_total_amount THEN
            UPDATE public.sales SET payment_status = 'Paid' WHERE id = NEW.sale_id AND payment_status != 'Paid';
        ELSIF v_refunded_total > 0 AND v_refunded_total >= v_collected_total THEN
            UPDATE public.sales SET payment_status = 'Refunded' WHERE id = NEW.sale_id AND payment_status != 'Refunded';
        ELSIF v_collected_total > 0 THEN
            UPDATE public.sales SET payment_status = 'Pending' WHERE id = NEW.sale_id AND payment_status != 'Pending';
        END IF;

        -- 5. SYNC INVOICE STATUS
        FOR v_invoice_status, v_due_date IN 
            SELECT status, due_date FROM public.finance_invoices WHERE sale_id = NEW.sale_id AND status NOT IN ('Void', 'Cancelled')
        LOOP
            IF v_collected_total >= v_total_amount THEN
                UPDATE public.finance_invoices 
                SET status = 'Paid', paid_at = now() 
                WHERE sale_id = NEW.sale_id AND status NOT IN ('Paid', 'Void', 'Cancelled');
            ELSIF v_collected_total < v_total_amount AND v_invoice_status != 'Draft' THEN
                IF v_due_date < CURRENT_DATE THEN
                    UPDATE public.finance_invoices SET status = 'Overdue' WHERE sale_id = NEW.sale_id AND status = 'Sent';
                ELSE
                    UPDATE public.finance_invoices SET status = 'Sent' WHERE sale_id = NEW.sale_id AND status = 'Overdue';
                END IF;
            END IF;
        -- Explicit end of loop to avoid confusion
        END LOOP;
    END IF;

    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS tr_sync_finance_lifecycle ON public.finance_transactions;
CREATE TRIGGER tr_sync_finance_lifecycle
    AFTER INSERT OR UPDATE ON public.finance_transactions
    FOR EACH ROW EXECUTE FUNCTION public.sync_finance_lifecycle();
