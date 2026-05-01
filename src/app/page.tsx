import type { ReactNode } from 'react'
import { projects } from '@/data/projects'
import { librarySections } from '@/data/library'
import { getArticles, formatDate } from '@/lib/feed'
import { EmailCopy } from '@/components/EmailCopy'
import { ThemeToggle } from '@/components/ThemeToggle'
import { TocLinks } from '@/components/TocLinks'

// ── Primitives ────────────────────────────────────────────────────────────────

const headingStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 14,
  fontWeight: 600,
  fontFamily: 'var(--font-sans)',
  color: 'var(--ink-soft)',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  display: 'flex',
  alignItems: 'center',
  gap: 7,
}

function Section({
  num,
  title,
  first = false,
  collapsible = false,
  defaultOpen = false,
  children,
}: {
  num: string
  title: string
  first?: boolean
  collapsible?: boolean
  defaultOpen?: boolean
  children: ReactNode
}) {
  const gap = collapsible ? 20 : 52

  if (collapsible) {
    return (
      <section id={title.toLowerCase()} style={{ marginTop: first ? 0 : gap }}>
        <details open={defaultOpen || undefined}>
          <summary className="section-summary">
            <h2 style={headingStyle}>
              <span style={{ color: 'var(--ink-faint)', fontWeight: 400 }}>{num}.</span>
              {title}
            </h2>
          </summary>
          <div style={{ paddingTop: 4 }}>{children}</div>
        </details>
      </section>
    )
  }

  return (
    <section id={title.toLowerCase()} style={{ marginTop: first ? 0 : 52 }}>
      <h2 style={{ ...headingStyle, marginBottom: 20 }}>
        <span style={{ color: 'var(--ink-faint)', fontWeight: 400 }}>{num}.</span>
        {title}
      </h2>
      {children}
    </section>
  )
}

function InlineLink({ href, children }: { href?: string; children: ReactNode }) {
  return (
    <a
      href={href ?? '#'}
      style={{ color: 'var(--accent)', textDecoration: 'none', borderBottom: '1px solid currentColor' }}
    >
      {children}
    </a>
  )
}

// ── Data ──────────────────────────────────────────────────────────────────────

const tocItems: [string, string][] = [
  ['1', 'Bio'        ],
  ['2', 'Projects'   ],
  ['3', 'Library'    ],
  ['4', 'Watercolors'],
  ['5', 'Writing'    ],
]

const watercolors = [
  { src: '/watercolor-basecampmoon.jpg', label: 'Basecamp Moon' },
  { src: '/watercolor-california.jpg',  label: 'California'    },
  { src: '/watercolor-finland.jpg',     label: 'Finland'       },
  { src: '/watercolor-sweden.jpg',      label: 'Sweden'        },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function Home() {
  const articles = await getArticles()

  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh' }}>
      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '200px 1fr',
        backgroundColor: 'var(--paper)',
        backgroundImage: [
          'radial-gradient(rgba(0,0,0,0.04) 1px, transparent 1px)',
          'radial-gradient(rgba(0,0,0,0.025) 1px, transparent 1px)',
        ].join(', '),
        backgroundSize: '3px 3px, 7px 7px',
        backgroundPosition: '0 0, 1px 1px',
        minHeight: '100vh',
      }}>

        {/* ── TOC Sidebar ─────────────────────────────────────────────── */}
        <aside
          className="toc-col"
          style={{
            background: 'var(--toc-bg)',
            borderRight: '1px solid var(--rule)',
            padding: '28px 20px',
            position: 'sticky',
            top: 0,
            alignSelf: 'start',
            height: '100vh',
            overflowY: 'auto',
          }}
        >
          <div style={{
            fontSize: 11,
            letterSpacing: '0.2em',
            fontWeight: 700,
            marginBottom: 8,
            fontFamily: 'var(--font-sans)',
            color: 'var(--ink-soft)',
            textTransform: 'uppercase',
          }}>
            Contents
          </div>
          <div style={{ height: 1, background: 'var(--rule)', marginBottom: 12 }} />

          <TocLinks items={tocItems} />

          <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14, color: 'var(--accent)', fontFamily: 'var(--font-sans)' }}>
            <a href="https://linkedin.com/in/dpetryshchuk" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>LinkedIn</a>
            <a href="https://github.com/dpetryshchuk" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>GitHub</a>
          </div>
        </aside>

        {/* ── Main Column ─────────────────────────────────────────────── */}
        <main style={{ padding: '44px 52px', maxWidth: 740 }}>

          {/* Title */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--rule)',
            paddingBottom: 24,
            marginBottom: 36,
          }}>
            <h1 style={{
              fontSize: 44,
              fontWeight: 700,
              margin: 0,
              lineHeight: 1,
              fontFamily: 'var(--font-sans)',
              letterSpacing: '-0.03em',
            }}>
              Dmytro Petryshchuk
            </h1>
            <ThemeToggle />
          </div>

          {/* 1. Bio */}
          <Section num="1" title="Bio" first collapsible defaultOpen>
            <p style={{ fontSize: 18, lineHeight: 1.75, margin: '0 0 16px' }}>
              Hey 👋, I'm Dmytro (or Dima), an entrepreneur, engineer, writer, and worldbuilding nerd.
            </p>
            <p style={{ fontSize: 18, lineHeight: 1.75, margin: '0 0 16px', textAlign: 'justify' }}>
              I'm the founder of{' '}
              <InlineLink href="https://www.onekeyflow.com">OneKeyFlow</InlineLink>
              , an AI automation agency serving businesses with outdated processes. Clients include a{' '}
              <InlineLink href="https://www.pearlwestgroup.com">$45m/yr ecommerce company</InlineLink>
              , a{' '}
              <InlineLink href="https://apparenttech.com">$3m/yr semiconductor fab</InlineLink>
              , a{' '}
              <InlineLink href="https://greatfm.com">radio talk show host</InlineLink>
              , and a{' '}
              <InlineLink href="https://topautologistics.com">$2m/yr auto transport logistics company</InlineLink>
              .
            </p>
            <p style={{ fontSize: 18, lineHeight: 1.75, margin: '0 0 16px', textAlign: 'justify' }}>
              Before this, I worked with{' '}
              <InlineLink href="https://fairquanta.com">FairQuanta</InlineLink>
              {' '}as a founding engineer building and researching AI and UI/UX to improve group cohesion. I also built{' '}
              <InlineLink href="http://valandar.com/">Valandar AI</InlineLink>
              , a Word add-in for vendor agreement lawyers.
            </p>
            <p style={{ fontSize: 18, lineHeight: 1.75, margin: '0 0 16px', textAlign: 'justify' }}>
              I also worked at{' '}
              <InlineLink href="https://www.midtronics.com">Midtronics</InlineLink>
              , a $100M/yr battery technology company that develops next-generation charging, discharging, and testing equipment. There I spent three years as an embedded software engineer building these systems.
            </p>
            <p style={{ fontSize: 18, lineHeight: 1.75, margin: '0 0 20px', textAlign: 'justify' }}>
              I'm a graduate of the University of Illinois at Urbana-Champaign, where I focused on neural circuits, embedded software, computer architecture, machine learning, and AI.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 16 }}>
              <p style={{ margin: 0, lineHeight: 1.75 }}>
                My resume is{' '}
                <a href="/resume.pdf" download style={{ color: 'var(--accent)', textDecoration: 'none', borderBottom: '1px solid currentColor' }}>
                  here
                </a>.
              </p>
              <p style={{ margin: 0, lineHeight: 1.75 }}>
                Email me at <EmailCopy />.
              </p>
            </div>
          </Section>

          {/* 2. Projects */}
          <Section num="2" title="Projects" collapsible defaultOpen>
            {(['work', 'experiment'] as const).map((cat, ci) => {
              const group = projects.filter(p => p.category === cat)
              return (
                <div key={cat}>
                  {ci > 0 && <div style={{ height: 1, background: 'var(--rule)', margin: '28px 0' }} />}
                  <div style={{ fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-sans)', color: 'var(--ink-faint)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>
                    {cat === 'work' ? 'Work' : 'Experiments'}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {group.map((p) => (
                      <div key={p.id} style={{ paddingLeft: 14, borderLeft: '2px solid var(--rule)' }}>
                        <div style={{ marginBottom: p.bullets.length > 0 ? 6 : 0 }}>
                          <span style={{ fontSize: 16, fontWeight: 600, fontFamily: 'var(--font-sans)' }}>
                            {p.name}
                          </span>
                          {p.role && (
                            <span style={{ fontSize: 13, color: 'var(--ink-faint)', fontWeight: 400, marginLeft: 8, fontFamily: 'var(--font-sans)' }}>
                              · {p.role}
                            </span>
                          )}
                          {p.dates && (
                            <span style={{ fontSize: 12, color: 'var(--ink-faint)', fontWeight: 400, marginLeft: 6, fontFamily: 'var(--font-sans)' }}>
                              {p.dates}
                            </span>
                          )}
                        </div>
                        {p.bullets.length > 0 && (
                          <ul style={{ margin: 0, padding: '0 0 0 18px', fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.7 }}>
                            {p.bullets.map((b, bi) => (
                              <li key={bi} style={{ marginBottom: 3 }}>{b}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </Section>

          {/* 3. Library */}
          <Section num="3" title="Library" collapsible>
            {librarySections.map((section) => (
              <div key={section.label} style={{ marginBottom: 28 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-soft)', fontFamily: 'var(--font-sans)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    {section.label}
                  </span>
                  <span style={{ fontSize: 11, color: 'var(--ink-faint)', fontFamily: 'var(--font-sans)' }}>
                    ({section.items.length})
                  </span>
                </div>
                <div>
                  {section.items.map((item, i) => (
                    <div key={i} style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr auto',
                      columnGap: 16,
                      padding: '6px 0',
                      borderBottom: '1px solid var(--rule)',
                      alignItems: 'baseline',
                    }}>
                      <span style={{ fontSize: 16, color: 'var(--ink)' }}>{item.title}</span>
                      <span style={{ fontSize: 12, color: 'var(--ink-faint)', whiteSpace: 'nowrap', fontFamily: 'var(--font-sans)' }}>{item.author}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Section>

          {/* 4. Watercolors */}
          <Section num="4" title="Watercolors" collapsible>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
              {watercolors.map(({ src, label }) => (
                <div key={src} style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={label}
                    style={{
                      width: '100%',
                      aspectRatio: '1 / 1.25',
                      objectFit: 'cover',
                      display: 'block',
                      border: '1px solid var(--rule)',
                    }}
                  />
                  <div style={{ fontSize: 12, color: 'var(--ink-faint)', textAlign: 'center', fontFamily: 'var(--font-sans)' }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* 5. Writing */}
          <Section num="5" title="Writing" collapsible>
            {articles.map(article => (
              <div
                key={article.slug}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  gap: 16,
                  padding: '8px 0',
                  borderBottom: '1px solid var(--rule)',
                }}
              >
                <span style={{ fontSize: 15, color: 'var(--ink)' }}>{article.title}</span>
                <span style={{ fontSize: 12, color: 'var(--ink-faint)', whiteSpace: 'nowrap', fontFamily: 'var(--font-sans)' }}>
                  {formatDate(article.pubDate)}
                </span>
              </div>
            ))}
          </Section>

          <div style={{ marginBottom: 60 }} />
        </main>

      </div>
    </div>
  )
}
