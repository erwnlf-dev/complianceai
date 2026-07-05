// FILE: src/app/dashboard/policies/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { Search, Plus, Trash2, Pencil } from 'lucide-react'
import { useStore } from '@/lib/store'
import { Policy } from '@/lib/types'

const PolicyPage = () => {
  const [state, dispatch] = useStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredPolicies, setFilteredPolicies] = useState<Policy[]>([])

  useEffect(() => {
    setFilteredPolicies(state.policies.filter((policy: Policy) => policy.title.toLowerCase().includes(searchTerm.toLowerCase())))
  }, [searchTerm, state.policies])

  const handleAdd = (policy: Policy) => {
    dispatch({ type: 'ADD_ENTITY', entity: 'policies', data: policy })
  }

  const handleUpdate = (policy: Policy) => {
    dispatch({ type: 'UPDATE_ENTITY', entity: 'policies', data: policy })
  }

  const handleDelete = (id: string) => {
    dispatch({ type: 'DELETE_ENTITY', entity: 'policies', id })
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Search policies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-md border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2 text-sm text-[var(--text)] focus:border-[var(--brand)] focus:outline-none"
        />
        <button className="rounded-md bg-[var(--brand)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--hover)]">
          <Plus className="mr-2 h-4 w-4" /> Add Policy
        </button>
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
              <td className="py-2 px-4">{policy.title}</td>
              <td className="py-2 px-4">{policy.framework}</td>
              <td className="py-2 px-4">{policy.status}</td>
              <td className="py-2 px-4">
                <button className="rounded-md border border-[var(--border)] px-4 py-2 text-sm text-[var(--body)]">
                  <Pencil className="h-4 w-4" />
                </button>
                <button className="ml-2 rounded-md bg-[#ef4444] px-4 py-2 text-sm font-medium text-white">
                  <Trash2 className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PolicyPage