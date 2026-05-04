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
      <div style={{ maxWidth: 895, margin: '0 auto', padding: '40px 24px 80px' }}>

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <header style={{ marginBottom: 32, borderBottom: '1px solid var(--rule)', paddingBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
            <h1 style={{
              margin: 0,
              fontSize: '1em',
              fontWeight: 400,
              fontFamily: 'var(--font-serif)',
              color: 'var(--ink)',
            }}>
              Dmytro Petryshchuk
            </h1>
            <nav style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.65em',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              display: 'flex',
              gap: 18,
              flexWrap: 'wrap',
            }}>
              {([
                ['/about',    'About'     ],
                ['/projects', 'Projects'  ],
                ['/library',  'Library'   ],
                ['/writing',  'Newsletter'],
              ] as const).map(([href, label]) => (
                <Link key={href} href={href} style={{
                  color: 'var(--ink-faint)',
                  textDecoration: 'none',
                }}>
                  {label}
                </Link>
              ))}
            </nav>
          </div>
          <p style={{
            margin: '8px 0 0',
            fontSize: '0.85em',
            color: 'var(--ink-soft)',
            fontStyle: 'italic',
          }}>
            Writing about consciousness, craft, and building things.
          </p>
        </header>

        {/* ── Essay index ─────────────────────────────────────────────────── */}
        <div className="essay-index-grid">
          {folders.map(folder => (
            <div key={folder} style={{ marginBottom: 28 }}>
              <div style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.6em',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--ink-faint)',
                marginBottom: 6,
              }}>
                {folder}
              </div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {byFolder[folder].map(essay => (
                  <li key={essay.slug} style={{ margin: '2px 0' }}>
                    <Link
                      href={`/essays/${essay.folder}/${essay.slug}`}
                      className="essay-index-link"
                      style={{
                        color: essay.status === 'draft' ? 'var(--ink-faint)' : 'var(--ink-soft)',
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
