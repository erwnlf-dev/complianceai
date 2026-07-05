# ComplianceAI ![License](https://img.shields.io/badge/license-MIT-blue)

Automated compliance evidence collection and mapping for Indonesian Fintech P2P lending platforms subject to OJK and UU PDP regulations.

## Features

*   **Automated Evidence Collection**: Ingest configuration and compliance snapshots from AWS and GCP.
*   **OJK & UU PDP Mapping**: Create and map organizational policies directly to local Indonesian regulatory articles.
*   **Integration Registry**: Toggle and manage third-party integrations (Slack, Jira) using standard naming schemas.
*   **Local Data Portability**: Export and import the entire workspace state as a single JSON file.
*   **Audit Activity Logging**: Maintain a read-only, timestamped audit trail of all compliance actions.
*   **Report Generation**: Export PDF-ready compliance audit reports formatted in Bahasa Indonesia.
*   **Zero-DB Architecture**: Run entirely in the browser using `localStorage` for state persistence.

## Tech Stack

*   **Framework**: Next.js (App Router)
*   **Styling**: Tailwind CSS
*   **Language**: TypeScript
*   **State Management**: React Context + LocalStorage API
*   **Deployment**: Cloudflare Pages / Vercel

## Getting Started

### Prerequisites

*   Node.js 18+
*   npm / pnpm / yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/compliance-ai.git
cd compliance-ai

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```text
src/
├── app/
│   ├── dashboard/
│   │   ├── policies/
│   │   │   └── page.tsx
│   │   ├── settings/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
└── lib/
    ├── store.tsx
    ├── types.ts
    └── utils.ts
```

## License

This project is licensed under the MIT License.

<!-- skipped: backend database and server-side PDF generation, add when multi-user collaboration or official certified audits are required -->