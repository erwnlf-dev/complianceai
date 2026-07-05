// FILE: src/app/layout.tsx
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ComplianceAI',
  description: 'Streamline audits with ComplianceAI, tailored for Indonesian Fintech P2P lending platforms.',
  openGraph: {
    title: 'ComplianceAI',
    description: 'Streamline audits with ComplianceAI, tailored for Indonesian Fintech P2P lending platforms.',
    url: 'https://complianceai.com',
    siteName: 'ComplianceAI',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'ComplianceAI',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description: 'Streamline audits with ComplianceAI, tailored for Indonesian Fintech P2P lending platforms.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="min-h-screen bg-[var(--bg-page)] text-[var(--text)]">
        {children}
      </body>
    </html>
  )
}
