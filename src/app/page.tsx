import Link from 'next/link'
import { getEssays } from '@/lib/essays'
import type { Essay } from '@/lib/essays'

export default function Home() {
  const essays = getEssays().sort((a, b) => b.date.localeCompare(a.date))

  const byFolder: Record<string, Essay[]> = {}
  for (const essay of essays) {
    if (!byFolder[essay.folder]) byFolder[essay.folder] = []
    byFolder[essay.folder].push(essay)
  }
  const folders = Object.keys(byFolder).sort()

  return (
    <div style={{ background: 'var(--paper)', minHeight: '100vh' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 32px 80px' }}>

        <header style={{ marginBottom: 40, paddingBottom: 24, borderBottom: '1px solid var(--rule)' }}>
          <h1 style={{
            fontSize: 22,
            fontWeight: 'normal',
            margin: '0 0 6px',
            color: 'var(--ink)',
            fontFamily: 'var(--font-sans)',
            letterSpacing: '-0.01em',
          }}>
            Dmytro Petryshchuk
          </h1>
          <p style={{ fontSize: 15, color: 'var(--ink-soft)', fontStyle: 'italic', margin: '0 0 14px' }}>
            Writing about consciousness, craft, and building things.
          </p>
          <nav style={{ display: 'flex', gap: 16, fontFamily: 'var(--font-sans)', fontSize: 13, flexWrap: 'wrap' }}>
            {[
              { href: '/about',    label: 'About'      },
              { href: '/projects', label: 'Projects'   },
              { href: '/library',  label: 'Library'    },
              { href: '/writing',  label: 'Newsletter' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                style={{ color: 'var(--accent)', textDecoration: 'none', borderBottom: '1px solid transparent' }}
              >
                {label}
              </Link>
            ))}
          </nav>
        </header>

        <div className="essay-index-grid">
          {folders.map(folder => (
            <div key={folder} style={{ marginBottom: 28 }}>
              <div style={{
                fontSize: 11,
                fontWeight: 700,
                fontFamily: 'var(--font-sans)',
                color: 'var(--ink-faint)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: 8,
              }}>
                {folder}
              </div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {byFolder[folder].map(essay => (
                  <li key={essay.slug} style={{ padding: '2px 0', lineHeight: 1.6 }}>
                    <Link
                      href={`/essays/${essay.folder}/${essay.slug}`}
                      className="essay-index-link"
                      style={{
                        fontSize: 15,
                        color: essay.status === 'draft' ? 'var(--ink-faint)' : 'var(--ink)',
                        fontStyle: essay.status === 'draft' ? 'italic' : 'normal',
                      }}
                    >
                      {essay.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
