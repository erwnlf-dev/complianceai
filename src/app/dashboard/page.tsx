// FILE: src/app/dashboard/page.tsx
'use client'

import { useEffect, useState } from 'react';
import { Search, Plus, Trash2, Pencil, HelpCircle } from 'lucide-react';
import { useStore } from '@/lib/store';
import { Policy, Integration, Evidence, ActivityLog } from '@/lib/types';

const DashboardPage = () => {
  const [state, dispatch] = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPolicies, setFilteredPolicies] = useState<Policy[]>(state.policies);

  useEffect(() => {
    const fetchEntities = async () => {
      // Fetch entities from API and dispatch SEED action
    };
    fetchEntities();
  }, []);

  useEffect(() => {
    const filtered = state.policies.filter((policy: Policy) =>
      policy.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPolicies(filtered);
  }, [searchTerm, state.policies]);

  const handleAddPolicy = () => {
    // Logic to add a new policy
  };

  const handleEditPolicy = (policy: Policy) => {
    // Logic to edit an existing policy
  };

  const handleDeletePolicy = (policyId: string) => {
    // Logic to delete a policy
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button onClick={handleAddPolicy} className="rounded-md bg-[var(--brand)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--hover)]">
          <Plus className="mr-2 h-4 w-4" /> Add Policy
        </button>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
        <input
          type="text"
          placeholder="Search policies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-md border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2 pl-10 text-sm text-[var(--text)] focus:border-[var(--brand)] focus:outline-none"
        />
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-xs uppercase text-[var(--muted)]">Title</th>
            <th className="text-xs uppercase text-[var(--muted)]">Framework</th>
            <th className="text-xs uppercase text-[var(--muted)]">Status</th>
            <th className="text-xs uppercase text-[var(--muted)]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPolicies.map((policy) => (
            <tr key={policy.id} className="border-b border-[var(--border)]">
              <td className="py-2">{policy.title}</td>
              <td className="py-2">{policy.framework}</td>
              <td className="py-2">{policy.status}</td>
              <td className="py-2">
                <button onClick={() => handleEditPolicy(policy)} className="mr-2 rounded-md border border-[var(--border)] px-2 py-1 text-sm text-[var(--body)]">
                  <Pencil className="h-4 w-4" />
                </button>
                <button onClick={() => handleDeletePolicy(policy.id)} className="rounded-md bg-[#ef4444] px-2 py-1 text-sm font-medium text-white">
                  <Trash2 className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <details className="mt-4">
        <summary className="cursor-pointer rounded-md border border-[var(--border)] bg-[var(--bg-panel)] px-4 py-2 text-sm font-medium text-[var(--body)]">
          <HelpCircle className="mr-2 h-4 w-4" /> Help
        </summary>
        <div className="mt-2 space-y-2">
          <p>Use the search bar to find policies.</p>
          <p>Click on a policy to edit or delete it.</p>
        </div>
      </details>
    </div>
  );
};

export default DashboardPage;