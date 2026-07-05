# ComplianceAI: PRD & Technical System Design

## 1. Product Overview
ComplianceAI is a specialized compliance automation platform tailored for Indonesian Fintech P2P lending platforms and tech startups subject to OJK (Otoritas Jasa Keuangan) and UU PDP (Undang-Undang Pelindungan Data Pribadi) regulations. The product automates evidence collection from cloud providers (AWS/GCP) and communication platforms, mapping them directly to local compliance frameworks to streamline audits.

---

## 2. Core Functional Requirements
*   **Automate Evidence Collection**: Connect to cloud providers (AWS/GCP) and ingest configuration/compliance snapshots.
*   **Manage Compliance Policies**: Create, edit, and map organizational policies to specific OJK and UU PDP articles.
*   **Integration Registry**: Register and toggle third-party integrations (e.g., `SlackIntegrationProvider`, `JiraIntegrationProvider`) using standard naming schemas.
*   **Generate Compliance Reports**: Export PDF-ready compliance audit reports in Bahasa Indonesia.
*   **Audit Activity Logging**: View a read-only, timestamped audit trail of all compliance actions and status changes.
*   **Export/Import Workspace**: Download all local compliance data as a single JSON file and upload to restore state.

---

## 3. Data Model & Persistence
All data is stored in `localStorage` serialized as JSON. Storage keys: `app_policies`, `app_integrations`, `app_evidence`, `app_logs`.

```typescript
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
```

---

## 4. OpenAPI 3.0 REST API Specification
```yaml
openapi: 3.0.3
info:
  title: ComplianceAI Local API
  version: 1.0.0
  description: REST API for managing local compliance schemas.
paths:
  /api/v1/policies:
    get:
      summary: List all compliance policies
      parameters:
        - name: framework
          in: query
          schema:
            type: string
      responses:
        '200':
          description: A list of policies
    post:
      summary: Create a new compliance policy
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [title, framework]
              properties:
                title: { type: string }
                description: { type: string }
                framework: { type: string, enum: [OJK, UU_PDP, ISO27001] }
      responses:
        '201':
          description: Policy created successfully
  /api/v1/policies/{id}:
    put:
      summary: Update a policy
      parameters:
        - name: id
          in: path
          required: true
          schema: { type: string }
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
      responses:
        '200':
          description: Policy updated
    delete:
      summary: Delete a policy
      parameters:
        - name: id
          in: path
          required: true
          schema: { type: string }
      responses:
        '204':
          description: Policy deleted
```

---

## 5. Modular Webhooks Specification
*   **Event Types**: `policy.created`, `policy.updated`, `evidence.failed`, `integration.disconnected`.
*   **Signature Verification**: The header `X-Webhook-Signature` contains the HMAC-SHA256 hash of the JSON payload payload, signed with the client's shared secret.
*   **Retry Policy**: Exponential backoff (5 retries: 10s, 1m, 10m, 1h, 6h).

```json
{
  "event": "evidence.failed",
  "timestamp": 1700000000,
  "payload": {
    "evidenceId": "ev-992",
    "title": "AWS S3 Bucket Public Access Check",
    "source": "AWS",
    "reason": "Public access block disabled"
  }
}
```

---

## 6. Pages, Routes & FUNCTIONALITY
*   **Landing Page (`/`)**: Decide/Learn surface. Hero section, 6 feature cards (e.g., OJK auto-mapping, local data residency proofing), 3 pricing tiers (Free, Startup, Enterprise), FAQ section (6 entries), CTA button to launch dashboard.
*   **Dashboard (`/dashboard`)**: Monitor surface. Displays total active policies, connected integrations, and validation health. Features an interactive SVG line chart of compliance score trends over 30 days and an audit log feed.
*   **Entity List (`/dashboard/policies`)**: Operate surface. CRUD table of policies. Search by title, filter by framework, and bulk archive/delete operations. Includes a "New Policy" modal.
*   **Entity Detail (`/dashboard/policies/[id]`)**: View/edit a single policy, update status (draft/active/archived), and view historical evidence associated with it.
*   **Settings (`/dashboard/settings`)**: Configure surface. Profile forms, webhook target registration, data export (JSON download), data import (JSON file upload), and "Reset System" button.

---

## 7. Component Specification per Page
*   **Dashboard**: Sidebar navigation (240px width, sticky links), StatCards (4 dynamic counts), TrendChart (raw SVG line graph), ActivityFeed (list of 5 recent logs).
*   **Policies List**: SearchBar (text input), FilterDropdown (framework select), PolicyTable (with checkboxes for bulk actions), CreatePolicyModal (form with validation).
*   **Settings**: FormContainer (max-w-2xl), ExportButton (calls utility file saver), ImportDropzone (handles file read events), ResetButton (red button trigger with confirm prompt).

---

## 8. User Flows
1.  **Create Policy**: User clicks "New Policy" -> fills in Title & selects "UU_PDP" -> clicks Save -> system validates data, appends it to `localStorage`, and displays a toast notification.
2.  **Toggle Integration**: User navigates to Settings -> clicks "Connect SlackIntegrationProvider" -> inputs webhook URL -> system registers integration and appends to activity log.
3.  **Export/Import State**: User clicks "Export JSON" in Settings -> receives instant download of `compliance_backup.json`. On a new browser, user uploads the file -> state updates instantly.

---

## 9. Mock Data (seeded on first load)
*   **Policies**: 4 default policies pre-mapped to OJK and UU PDP.
*   **Integrations**: 2 active integrations (`SlackIntegrationProvider`, `JiraIntegrationProvider`).
*   **Evidence**: 5 automated check logs.

---

## 10. File Manifest
```json
[
  {"path": "src/app/layout.tsx", "purpose": "Root layout: Inter font, dark theme, metadata, GlobalProvider wrapper", "dependencies": []},
  {"path": "src/app/globals.css", "purpose": "Tailwind directives + CSS custom properties + animations", "dependencies": []},
  {"path": "src/app/page.tsx", "purpose": "Landing page — Decide/Learn surface: hero, features, pricing, FAQ, social proof, CTA", "dependencies": []},
  {"path": "src/app/dashboard/layout.tsx", "purpose": "Dashboard layout: sidebar nav + topbar + main content area. Wraps all dashboard pages with StoreProvider.", "dependencies": []},
  {"path": "src/app/dashboard/page.tsx", "purpose": "Dashboard home — Monitor surface: computed stat cards, charts from real data, recent activity feed", "dependencies": []},
  {"path": "src/app/dashboard/policies/page.tsx", "purpose": "Entity CRUD list — Operate surface: data table, create/edit/delete, search, sort, filter, bulk actions", "dependencies": []},
  {"path": "src/app/dashboard/settings/page.tsx", "purpose": "Settings — Configure surface: profile form, notification toggles, data export/import/reset", "dependencies": []},
  {"path": "src/lib/store.tsx", "purpose": "React Context + useReducer global state: entities CRUD, seed data, localStorage sync, toast notifications", "dependencies": []},
  {"path": "src/lib/types.ts", "purpose": "TypeScript interfaces for ALL entities and state shapes", "dependencies": []},
  {"path": "src/lib/utils.ts", "purpose": "Utilities: formatDate, formatNumber, classNames, generateId, exportJSON, importJSON", "dependencies": []}
]
```

---

```typescript
// Self-check: Validate integration provider interface names and target market configurations.
class IntegrationRegistry {
    private providers: Record<string, boolean> = {};

    register(name: string): void {
        if (!name.endsWith("IntegrationProvider")) {
            throw new Error(`Invalid naming schema for: ${name}. Must end with 'IntegrationProvider'`);
        }
        this.providers[name] = true;
    }

    has(name: string): boolean {
        return !!this.providers[name];
    }
}

// Runnable assertion
const registry = new IntegrationRegistry();
registry.register("SlackIntegrationProvider");
registry.register("JiraIntegrationProvider");
if (!registry.has("SlackIntegrationProvider")) {
    throw new Error("Self-check failed: Registry could not find registered provider.");
}
console.log("Self-check passed.");
```
→ skipped: Automated integration test suite, add when setting up CI/CD pipeline.