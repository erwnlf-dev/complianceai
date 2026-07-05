// FILE: src/lib/types.ts
export interface Policy {
  id: string;
  title: string;
  description: string;
  framework: 'OJK' | 'UU_PDP' | 'ISO27001';
  status: 'draft' | 'active' | 'archived';
  createdAt: number;
  updatedAt: number;
}

export interface Integration {
  id: string;
  name: string; // Must end with 'IntegrationProvider'
  type: 'slack' | 'jira' | 'discord' | 'gdrive' | 'pagerduty';
  status: 'connected' | 'disconnected';
  config: Record<string, string>;
  createdAt: number;
  updatedAt: number;
}

export interface Evidence {
  id: string;
  title: string;
  source: 'AWS' | 'GCP' | 'Manual';
  status: 'valid' | 'expired' | 'warning';
  policyId: string; // Mapped policy
  createdAt: number;
  updatedAt: number;
}

export interface ActivityLog {
  id: string;
  action: string;
  details: string;
  createdAt: number;
}
