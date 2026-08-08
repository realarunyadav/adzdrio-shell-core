/**
 * Global application configuration.
 * Nothing in the app should hardcode branding, product naming or shell
 * behaviour — everything is read from here.
 */
export interface AppConfig {
  productName: string;
  productShortName: string;
  organization: string;
  version: string;
  /** Reserved for future SaaS multi-tenancy. */
  tenant: {
    enabled: boolean;
    resolutionStrategy: "single" | "subdomain" | "path" | "header";
    defaultTenantId: string;
  };
  shell: {
    sidebarDefaultOpen: boolean;
    showGlobalSearch: boolean;
    showBreadcrumbs: boolean;
  };
  theme: {
    defaultMode: "light" | "dark" | "system";
    allowUserToggle: boolean;
    storageKey: string;
  };
  support: {
    documentationUrl: string;
  };
}

export const appConfig: AppConfig = {
  productName: "ADZDRIO",
  productShortName: "ADZDRIO",
  organization: "Adzdrio India Services Pvt. Ltd.",
  version: "1.0.0",
  tenant: {
    enabled: false,
    resolutionStrategy: "single",
    defaultTenantId: "adzdrio",
  },
  shell: {
    sidebarDefaultOpen: true,
    showGlobalSearch: true,
    showBreadcrumbs: true,
  },
  theme: {
    defaultMode: "light",
    allowUserToggle: true,
    storageKey: "abos.theme",
  },
  support: {
    documentationUrl: "#",
  },
};