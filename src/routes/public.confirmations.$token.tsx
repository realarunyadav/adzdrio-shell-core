import { createFileRoute } from '@tanstack/react-router';
import * as React from 'react';
import { leadsService, adminService, PolicyVersion, RapidLead } from '@/lib/api/services';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle2, XCircle, Loader2, AlertTriangle, ShieldCheck, FileText, Smartphone, Tv, Laptop, Clock, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export const Route = createFileRoute('/public/confirmations/$token')({
  component: RapidConfirmationPage,
});

function RapidConfirmationPage() {
  const { token } = Route.useParams();
  const [loading, setLoading] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);
  const [lead, setLead] = React.useState<RapidLead | null>(null);
  const [policies, setPolicies] = React.useState<{ tc?: PolicyVersion; refund?: PolicyVersion }>({});
  const [error, setError] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState<'idle' | 'success' | 'declined'>('idle');
  const [declineReason, setDeclineReason] = React.useState('');
  const [feedback, setFeedback] = React.useState('');
  const [showDeclineForm, setShowDeclineForm] = React.useState(false);

  React.useEffect(() => {
    async function fetchDetails() {
      try {
        setLoading(true);
        const details = await leadsService.getConfirmationDetails(token);
        setLead(details);

        // Fetch associated policy versions if they exist
        // In a real scenario, these IDs would come from the lead record
        // For now, we'll fetch the active ones as fallback
        const [tcPolicies, refundPolicies] = await Promise.all([
          adminService.getPolicyVersions('terms_and_conditions'),
          adminService.getPolicyVersions('refund_policy')
        ]);

        setPolicies({
          tc: tcPolicies.find(p => p.isActive),
          refund: refundPolicies.find(p => p.isActive)
        });

        if (details.status === 'confirmed') setStatus('success');
        if (details.status === 'not_confirmed') setStatus('declined');
      } catch (err: any) {
        setError(err.message || 'Invalid or expired confirmation link');
      } finally {
        setLoading(false);
      }
    }
    fetchDetails();
  }, [token]);

  const handleConfirm = async () => {
    try {
      setSubmitting(true);
      await leadsService.submitConfirmation(token, true, {});
      setStatus('success');
      toast.success('Service confirmed successfully');
    } catch (err: any) {
      toast.error(err.message || 'Failed to submit confirmation');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDecline = async () => {
    if (!declineReason) {
      toast.error('Please select a reason for declining');
      return;
    }
    try {
      setSubmitting(true);
      await leadsService.submitConfirmation(token, false, { reason: declineReason, feedback });
      setStatus('declined');
      toast.info('Response recorded');
    } catch (err: any) {
      toast.error(err.message || 'Failed to submit response');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-4">
          <Loader2 className="size-10 text-primary animate-spin mx-auto" />
          <p className="text-sm font-medium text-slate-500">Retrieving your service details...</p>
        </div>
      </div>
    );
  }

  if (error || !lead) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <Card className="max-w-md w-full border-none shadow-xl">
          <CardContent className="pt-10 pb-10 text-center space-y-4">
            <div className="size-16 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="size-8" />
            </div>
            <h1 className="text-xl font-bold text-slate-900">Link Unavailable</h1>
            <p className="text-sm text-slate-500 leading-relaxed">
              {error === 'Expired' 
                ? 'This confirmation link has expired for security reasons. Please contact your account executive for a new one.' 
                : 'This link is invalid or has been deactivated. Please check the URL and try again.'}
            </p>
            <div className="pt-4">
              <Button variant="outline" className="w-full" onClick={() => window.location.reload()}>Try Again</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <Card className="max-w-md w-full border-none shadow-xl animate-in zoom-in-95 duration-300">
          <CardContent className="pt-10 pb-10 text-center space-y-4">
            <div className="size-16 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="size-8" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Service Confirmed</h1>
            <p className="text-sm text-slate-500 leading-relaxed">
              Thank you, <span className="font-bold text-slate-900">{lead.customerName}</span>. Your confirmation has been recorded.
            </p>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-left space-y-2 mt-4">
              <div className="flex justify-between text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                <span>Reference</span>
                <span>#{lead.id.slice(0, 8).toUpperCase()}</span>
              </div>
              <p className="text-xs text-slate-600">
                Our activation team will now begin processing your request. You will receive a notification once your services are active.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === 'declined') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <Card className="max-w-md w-full border-none shadow-xl">
          <CardContent className="pt-10 pb-10 text-center space-y-4">
            <div className="size-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Info className="size-8" />
            </div>
            <h1 className="text-xl font-bold text-slate-900">Response Recorded</h1>
            <p className="text-sm text-slate-500 leading-relaxed">
              We've received your feedback regarding the proposed service plan. An executive will review this and get back to you if necessary.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50 py-4 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-black text-xs">A</div>
            <span className="font-black text-sm tracking-tighter text-slate-900">ABOS SECURE</span>
          </div>
          <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-widest border-slate-200 text-slate-400">
            Secure Confirmation link
          </Badge>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 sm:p-6 mt-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Review Your Service Plan</h1>
          <p className="text-slate-500 font-medium">Please review the details below to confirm your subscription activation.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            <Card className="border-none shadow-sm overflow-hidden">
              <CardHeader className="bg-slate-900 text-white pb-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="text-xl font-black tracking-tight">{lead.selectedPlanId.replace(/_/g, ' ').toUpperCase()}</CardTitle>
                    <CardDescription className="text-slate-400 font-medium">Enterprise Subscription Plan</CardDescription>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black tracking-tighter">₹{lead.price.toLocaleString()}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{lead.duration} Months Term</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Subscriber</p>
                    <p className="text-sm font-bold text-slate-900">{lead.customerName}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Primary Contact</p>
                    <p className="text-sm font-bold text-slate-900">{lead.customerEmail}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Included Devices</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {lead.devices.map((device, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                        {device.toLowerCase().includes('tv') ? <Tv className="size-4 text-slate-400" /> : 
                         device.toLowerCase().includes('phone') ? <Smartphone className="size-4 text-slate-400" /> :
                         <Laptop className="size-4 text-slate-400" />}
                        <span className="text-xs font-bold text-slate-700">{device}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck className="size-4 text-primary" />
                Policies & Compliance
              </h3>
              
              <Tabs defaultValue="tc" className="w-full">
                <TabsList className="w-full justify-start bg-transparent h-auto p-0 border-b border-slate-200 rounded-none mb-4">
                  <TabsTrigger value="tc" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2 text-xs font-bold">Terms & Conditions</TabsTrigger>
                  <TabsTrigger value="refund" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2 text-xs font-bold">Refund Policy</TabsTrigger>
                </TabsList>
                <TabsContent value="tc" className="mt-0">
                  <Card className="border-slate-200 shadow-none">
                    <ScrollArea className="h-[200px] p-4">
                      <div className="prose prose-slate prose-xs">
                        <p className="text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-widest">
                          Version {policies.tc?.version || '1.0'} • Effective {policies.tc?.effectiveDate || 'Aug 2026'}
                        </p>
                        <div className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap">
                          {policies.tc?.content || 'Standard enterprise terms apply...'}
                        </div>
                      </div>
                    </ScrollArea>
                  </Card>
                </TabsContent>
                <TabsContent value="refund" className="mt-0">
                  <Card className="border-slate-200 shadow-none">
                    <ScrollArea className="h-[200px] p-4">
                      <div className="prose prose-slate prose-xs">
                        <p className="text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-widest">
                          Version {policies.refund?.version || '1.0'} • Effective {policies.refund?.effectiveDate || 'Aug 2026'}
                        </p>
                        <div className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap">
                          {policies.refund?.content || 'Standard refund policies apply...'}
                        </div>
                      </div>
                    </ScrollArea>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Action Sidebar */}
          <div className="space-y-6">
            <Card className="border-none shadow-xl bg-white sticky top-24">
              <CardContent className="p-6 space-y-6">
                {!showDeclineForm ? (
                  <>
                    <div className="space-y-2">
                      <h4 className="font-black text-slate-900 tracking-tight">Finalize Activation</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        By clicking confirm, you agree to the selected plan and the associated policies.
                      </p>
                    </div>

                    <div className="space-y-3 pt-2">
                      <Button 
                        className="w-full h-12 text-sm font-bold shadow-lg shadow-primary/20" 
                        onClick={handleConfirm}
                        disabled={submitting}
                      >
                        {submitting ? <Loader2 className="size-4 animate-spin mr-2" /> : <CheckCircle2 className="size-4 mr-2" />}
                        YES, I CONFIRM
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full text-xs font-bold text-slate-400 hover:text-destructive hover:bg-destructive/5"
                        onClick={() => setShowDeclineForm(true)}
                        disabled={submitting}
                      >
                        NO, NOT CONFIRM
                      </Button>
                    </div>

                    <div className="pt-4 border-t border-slate-100 space-y-3">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <Clock className="size-3" />
                        Offer Expires
                      </div>
                      <p className="text-xs font-bold text-slate-700">{new Date(lead.expiresAt).toLocaleDateString()} at {new Date(lead.expiresAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  </>
                ) : (
                  <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                    <div className="space-y-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="p-0 h-auto text-[10px] font-black uppercase tracking-widest text-primary mb-2"
                        onClick={() => setShowDeclineForm(false)}
                      >
                        ← Back to Review
                      </Button>
                      <h4 className="font-black text-slate-900 tracking-tight">Reason for Decline</h4>
                      <p className="text-xs text-slate-500">Please help us understand why this plan doesn't meet your needs.</p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        {[
                          'Pricing is higher than expected',
                          'Incorrect device configuration',
                          'Term duration is too long',
                          'Need more time to decide',
                          'Information is incorrect'
                        ].map((reason) => (
                          <div 
                            key={reason}
                            onClick={() => setDeclineReason(reason)}
                            className={cn(
                              "p-3 rounded-xl border text-xs font-bold cursor-pointer transition-all",
                              declineReason === reason ? "bg-primary/5 border-primary text-primary" : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                            )}
                          >
                            {reason}
                          </div>
                        ))}
                      </div>

                      <div className="space-y-2">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Additional Feedback (Optional)</p>
                        <Textarea 
                          placeholder="Tell us more..." 
                          className="text-xs min-h-[100px] bg-slate-50 border-slate-200"
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                        />
                      </div>

                      <Button 
                        variant="destructive" 
                        className="w-full font-bold h-12"
                        disabled={!declineReason || submitting}
                        onClick={handleDecline}
                      >
                        {submitting ? <Loader2 className="size-4 animate-spin mr-2" /> : <XCircle className="size-4 mr-2" />}
                        SUBMIT RESPONSE
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="p-4 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center text-center gap-2">
              <FileText className="size-5 text-slate-300" />
              <p className="text-[10px] font-bold text-slate-400 leading-tight">
                This document is a digitally secure proposal. Your response is recorded for compliance and activation purposes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Re-using Tabs from UI for the public page to avoid duplication, assuming they are available
import { TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
