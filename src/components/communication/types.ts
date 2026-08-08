export type EmailStatus = 'queued' | 'sent' | 'delivered' | 'failed' | 'bounced';

export interface MailboxIdentity {
  id: string;
  name: string;
  displayName: string;
  email: string;
  department?: string;
  team?: string;
  isActive: boolean;
  provider: 'hostinger' | 'smtp' | 'imap';
  config: {
    host: string;
    port: number;
    secure: boolean;
    user: string;
    // Password never stored/exposed in frontend
  };
}

export interface EmailMessage {
  id: string;
  mailboxId: string;
  threadId: string;
  from: {
    name: string;
    email: string;
  };
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  body: string;
  htmlBody: string;
  status: EmailStatus;
  timestamp: string;
  attachments: Array<{
    id: string;
    name: string;
    size: number;
    type: string;
    url: string;
  }>;
  relatedTo?: {
    type: 'customer' | 'prospect' | 'invoice' | 'sale' | 'ticket';
    id: string;
    label: string;
  };
  errorInfo?: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  variables: string[];
  category: string;
  version: string;
  isActive: boolean;
  lastUpdated: string;
}

export interface EmailSignature {
  id: string;
  name: string;
  type: 'employee' | 'team' | 'company';
  content: string;
  ownerId?: string;
  teamId?: string;
}
