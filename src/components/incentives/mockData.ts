import { IncentiveProgram, Achievement } from "./types";

export const mockPrograms: IncentiveProgram[] = [
  {
    id: "p1",
    name: "Q3 Sales Acceleration",
    description: "Incentive program for driving enterprise software sales.",
    effectiveDate: "2026-07-01",
    expiryDate: "2026-09-30",
    status: 'active',
    scope: { type: 'role', ids: ['sales_executive'] },
    rules: [{
      metric: 'revenue',
      target: 1000000,
      thresholds: [
        { label: 'Standard', min: 800000, reward: 50000 },
        { label: 'Accelerator', min: 1000000, reward: 75000 },
        { label: 'Super Accelerator', min: 1200000, reward: 100000 }
      ]
    }],
    version: 1
  }
];

export const mockAchievements: Achievement[] = [
  {
    id: "a1",
    programId: "p1",
    employeeId: "emp123",
    period: "August 2026",
    value: 850000,
    status: 'verified',
    verifiedBy: "admin_user"
  }
];
