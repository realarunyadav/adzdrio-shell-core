# ABOS Final – Identity Experience Framework v1.0

This document defines the User Experience (UX) architecture for Identity Management within the Adzdrio Business Operating System (ABOS), adhering to the Master Specification and Module Blueprint.

## 1. Authentication Philosophy
- **Frictionless Security:** Security measures should be robust but never hinder productivity.
- **Contextual Trust:** Identity verification should adapt based on the sensitivity of the action and the user's environment.
- **Consistency:** A unified entry experience across all business modules and platforms.

## 2. Identity Entry Points
- **Primary:** Corporate login portal (`auth.adzdrio.com` or `/auth`).
- **Secondary:** Deep-link redirects from external notifications (Email/SMS).
- **Embedded:** Re-authentication modals for high-sensitivity actions (e.g., Finance approvals).

## 3. Login Experience
- **Minimalist Aesthetic:** Clean, centered card layout on the brand-standard canvas (#F8FAFC).
- **Progressive Disclosure:** First, identify the user (Email/Username), then request credentials (Password/MFA).
- **Branding:** Prominent Adzdrio Gold accent and high-contrast typography.

## 4. Forgot Password Experience
- **Simple Recovery:** Single-field request (Email).
- **Security Privacy:** Generic success message ("If an account exists, instructions have been sent") to prevent user enumeration.

## 5. Password Reset Experience
- **Strength Guidance:** Real-time visual feedback on password complexity.
- **Auto-Fill Compatibility:** Optimized for password managers.

## 6. Session Expired Experience
- **Proactive Warning:** Notification bar 5 minutes before expiry.
- **Graceful Re-entry:** Non-destructive overlay allowing login without losing unsaved form data.

## 7. Account Locked Experience
- **Clear Communication:** Explanation of why (too many attempts) and clear resolution steps (contact Admin or wait X minutes).
- **Support Integration:** Direct link to Corporate IT/Admin support.

## 8. Unauthorized Access Experience
- **403 States:** Branded "Access Denied" page explaining the missing permission and a "Request Access" action.
- **Navigation Recovery:** Easy "Go Back" or "Return to Dashboard" buttons.

## 9. Maintenance Mode Experience
- **Planned Downtime:** Clear countdown and estimated restoration time.
- **Business Continuity:** Links to emergency offline procedures or contact information.

## 10. First Login Experience
- **Account Verification:** Mandatory email/SMS verification.
- **Security Setup:** Forced password change (if temporary) and initial MFA enrollment.

## 11. Welcome Experience
- **Personalization:** "Welcome back, [First Name]" greeting.
- **Guided Tour:** Optional "Quick Start" overlay for new users/modules.

## 12. Loading States
- **Visual Pacing:** Branded skeleton screens and a gold indeterminate progress bar for authentication transitions.

## 13. Error States
- **Semantic Clarity:** Red text for errors, gold for warnings.
- **Actionable:** Every error must suggest a fix or provide a support code.

## 14. Success States
- **Confirmatory:** Subtle, non-intrusive green checkmarks or brief toast notifications.

## 15. Empty States
- **Contextual Guidance:** When no modules are assigned, show a "Welcome to ABOS" screen with instructions to contact the System Admin.

## 16. Accessibility Standards
- **WCAG 2.1 AA:** High contrast ratios, aria-labels for all form fields, and screen reader compatibility.

## 17. Keyboard Navigation
- **Logical Flow:** Strict tab order (Identity > Credential > Action).
- **Visible Focus:** Prominent Adzdrio Gold ring around active fields.

## 18. Mobile Experience
- **Touch-Friendly:** Large tap targets (min 44px).
- **Keyboard Optimization:** Appropriate input types (`type="email"`, `type="password"`).

## 19. Tablet Experience
- **Responsive Grid:** Centered auth card with side padding.

## 20. Desktop Experience
- **Efficient Layout:** Optimized for wide screens, maintaining information density.

## 21. Enterprise Security UX
- **Audit Transparency:** Users can view their "Recent Login Activity" within their profile.
- **Device Management:** Visible list of active sessions with "Logout Everywhere" capability.

## 22. Branding Rules
- **Font:** SF Pro Display (headings), Inter (body).
- **Colors:** Deep Navy (#0F172A) containers, Adzdrio Gold (#F5A300) accents.

## 23. Future Readiness
- **MFA:** Built-in slots for TOTP (Authenticator App) and SMS/Email codes.
- **Passkeys:** WebAuthn-ready UI patterns.
- **OAuth/SSO:** Placeholder for "Sign in with Company ID" (OIDC/SAML).
- **Magic Links:** Experience flow for passwordless email-based entry.
