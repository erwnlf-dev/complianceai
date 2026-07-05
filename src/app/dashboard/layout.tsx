// FILE: src/app/dashboard/layout.tsx
'use client'

import { useEffect, useState } from 'react'
import { Search, Plus, Trash2, Pencil, HelpCircle } from 'lucide-react'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'ComplianceAI',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description: 'Streamline audits with ComplianceAI, tailored for Indonesian Fintech P2P lending platforms and tech startups.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setShowHelp(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    if (typeof window !== 'undefined' && !localStorage.getItem('cookie-consent')) {
      setShowConsent(true);
    }

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex min-h-screen bg-[var(--bg-page)] text-[var(--text)]">
      <div className="fixed inset-y-0 left-0 w-60 border-r border-[var(--border)] bg-[var(--bg-panel)]">
        <div className="p-4">
          <h1 className="text-xl font-bold">ComplianceAI</h1>
          <nav className="mt-6 space-y-2">
            <a href="#" className="flex items-center space-x-2 text-[var(--body)] hover:text-[var(--brand)]">
              <Search className="w-4 h-4" />
              <span>Search</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-[var(--body)] hover:text-[var(--brand)]">
              <Plus className="w-4 h-4" />
              <span>New Policy</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-[var(--body)] hover:text-[var(--brand)]">
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-[var(--body)] hover:text-[var(--brand)]">
              <Pencil className="w-4 h-4" />
              <span>Edit</span>
            </a>
          </nav>
        </div>
      </div>
      <div className="ml-60 p-4">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-md border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2 text-sm text-[var(--text)] focus:border-[var(--brand)] focus:outline-none"
          />
          <button onClick={() => setShowHelp(!showHelp)} className="rounded-md border border-[var(--border)] px-4 py-2 text-sm text-[var(--body)]">
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
        {children}
      </div>
      <details open={showHelp} className="absolute top-0 right-0 mt-4 mr-4">
        <summary className="cursor-pointer">Help</summary>
        <div className="mt-2 p-4 bg-[var(--bg-panel)] border border-[var(--border)] rounded-lg shadow-lg">
          <p>Press <kbd>Cmd+K</kbd> or <kbd>Ctrl+K</kbd> to search.</p>
        </div>
      </details>
      <div className="fixed bottom-4 right-4">
        {showConsent && (
          <div className="p-4 bg-[var(--bg-panel)] border border-[var(--border)] rounded-lg shadow-lg">
            <p>We use cookies for better experience. <button className="underline" onClick={() => {
              if (typeof window !== 'undefined') {
                localStorage.setItem('cookie-consent', 'true');
                setShowConsent(false);
              }
            }}>Accept</button></p>
          </div>
        )}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
