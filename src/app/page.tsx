import Link from 'next/link'
import { getEssays } from '@/lib/essays'
import type { Essay } from '@/lib/essays'

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: 'var(--font-serif)',
      fontVariant: 'small-caps',
      fontSize: '1.15em',
      fontWeight: 700,
      color: 'var(--ink)',
      paddingBottom: 5,
      borderBottom: '1px solid var(--rule)',
      marginBottom: 12,
    }}>
      {children}
    </div>
  )
}

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
      <div style={{ maxWidth: 895, margin: '0 auto', padding: '24px 24px 80px' }}>

        {/* ── Logo + Nav ─────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', marginBottom: 28 }}>
          <div style={{
            width: 64, height: 64, flexShrink: 0,
            border: '1px solid var(--ink)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2.4em',
            color: 'var(--ink)',
            userSelect: 'none',
          }}>
            𝔇
          </div>
          <nav style={{ display: 'flex', flex: 1, flexWrap: 'wrap' }}>
            {([
              ['/',           'Site'      ],
              ['/about',      'Me'        ],
              ['/projects',   'Projects'  ],
              ['/library',    'Library'   ],
              ['/writing',    'Newsletter'],
            ] as const).map(([href, label]) => (
              <Link key={href} href={href} style={{
                height: 64,
                padding: '0 20px',
                display: 'flex', alignItems: 'center',
                border: '1px solid var(--rule)',
                marginLeft: '-1px',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.65em',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--ink-soft)',
                textDecoration: 'none',
              }}>
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* ── Intro ──────────────────────────────────────────────────────────── */}
        <p style={{ margin: '0 0 1.6em', lineHeight: 1.65 }}>
          This is the website of <strong>Dmytro Petryshchuk</strong>. I write about
          consciousness, craft, and building things.
        </p>

        {/* ── Three-column index ─────────────────────────────────────────────── */}
        <div className="home-columns">

          {/* Recent */}
          <div>
            <SectionHeader>Recent</SectionHeader>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {essays.map(essay => (
                <li key={`${essay.folder}/${essay.slug}`} style={{ display: 'flex', gap: 8, alignItems: 'baseline', marginBottom: 6 }}>
                  <span aria-hidden="true" style={{ color: 'var(--ink-faint)', fontSize: '0.78em', flexShrink: 0, lineHeight: 1.6 }}>◈</span>
                  <Link href={`/essays/${essay.folder}/${essay.slug}`} style={{
                    fontSize: '0.92em',
                    fontStyle: essay.status === 'draft' ? 'italic' : 'normal',
                    color: essay.status === 'draft' ? 'var(--ink-faint)' : 'var(--accent)',
                  }}>
                    {essay.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* By Topic */}
          <div>
            <SectionHeader>By Topic</SectionHeader>
            {folders.map(folder => (
              <div key={folder} style={{ marginBottom: 20 }}>
                <div style={{
                  fontSize: '0.62em', fontWeight: 700,
                  fontFamily: 'var(--font-sans)',
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: 'var(--ink-faint)', marginBottom: 6,
                }}>
                  {folder}
                </div>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                  {byFolder[folder].map(essay => (
                    <li key={essay.slug} style={{ display: 'flex', gap: 8, alignItems: 'baseline', marginBottom: 6 }}>
                      <span aria-hidden="true" style={{ color: 'var(--ink-faint)', fontSize: '0.78em', flexShrink: 0, lineHeight: 1.6 }}>✦</span>
                      <Link href={`/essays/${essay.folder}/${essay.slug}`} style={{ fontSize: '0.92em' }}>
                        {essay.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* About */}
          <div>
            <SectionHeader>About</SectionHeader>
            <p style={{ fontSize: '0.9em', lineHeight: 1.65, margin: '0 0 0.85em' }}>
              Entrepreneur, engineer, writer. Founder of{' '}
              <a href="https://onekeyflow.com">OneKeyFlow</a>, an AI automation agency.
            </p>
            <p style={{ fontSize: '0.9em', lineHeight: 1.65, margin: '0 0 0.85em' }}>
              Previously embedded software at Midtronics, AI research at FairQuanta.
              UIUC graduate.
            </p>
            <p style={{ margin: 0 }}>
              <Link href="/about" style={{ fontSize: '0.85em' }}>Full bio →</Link>
            </p>
          </div>

        </div>

      </div>
    </div>
  )
}
