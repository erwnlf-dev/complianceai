// FILE: src/app/dashboard/settings/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { Search, Plus, Trash2, Pencil, HelpCircle } from 'lucide-react'

const initialProfile = {
  name: '',
  email: ''
}

const SettingsPage = () => {
  const [profile, setProfile] = useState<{ name: string; email: string }>(initialProfile)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const savedProfile = localStorage.getItem('profile')
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile))
      }
    } catch (e) {
      console.error(e)
    }
  }, [])

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  const saveProfile = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('profile', JSON.stringify(profile))
      alert('Profile saved!')
    }
  }

  const exportData = () => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem('app_state')
      if (data) {
        const blob = new Blob([data], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'complianceai-data.json'
        a.click()
      }
    }
  }

  const importData = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof window !== 'undefined') {
      const file = e.target.files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          const text = event.target?.result
          if (typeof text === 'string') {
            localStorage.setItem('app_state', text)
            alert('Data imported successfully!')
            window.location.reload()
          }
        }
        reader.readAsText(file)
      }
    }
  }

  const resetData = () => {
    if (typeof window !== 'undefined') {
      if (confirm('Are you sure you want to reset all data?')) {
        localStorage.clear()
        alert('Data reset successfully!')
      }
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text)]">
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-5">Settings</h1>
        <div className="mb-5">
          <h2 className="text-lg font-semibold mb-2">Profile</h2>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
              className="rounded-md border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2 text-sm text-[var(--text)] focus:border-[var(--brand)] focus:outline-none"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
              className="rounded-md border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2 text-sm text-[var(--text)] focus:border-[var(--brand)] focus:outline-none"
            />
          </div>
          <button onClick={saveProfile} className="rounded-md bg-[var(--brand)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--hover)]">
            Save Profile
          </button>
        </div>
        <div className="mb-5">
          <h2 className="text-lg font-semibold mb-2">Data Management</h2>
          <button onClick={exportData} className="rounded-md bg-[var(--brand)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--hover)] mr-2">
            Export Data
          </button>
          <input type="file" onChange={importData} className="mr-2" />
          <button onClick={resetData} className="rounded-md bg-[#ef4444] px-4 py-2 text-sm font-medium text-white hover:bg-[#dc2626]">
            Reset Data
          </button>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage