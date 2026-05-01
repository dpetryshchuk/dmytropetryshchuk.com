import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getEssays, getEssay, formatEssayDate } from '@/lib/essays'
import { ThemeToggle } from '@/components/ThemeToggle'

export function generateStaticParams() {
  return getEssays().map(e => ({ slug: e.slug }))
}

export default function EssayPage({ params }: { params: { slug: string } }) {
  const essay = getEssay(params.slug)
  if (!essay) notFound()

  const allEssays = getEssays().sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh' }}>
      <div className="site-grid" style={{
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

        <aside className="toc-col" style={{
          background: 'var(--toc-bg)',
          borderRight: '1px solid var(--rule)',
          padding: '28px 20px',
          position: 'sticky',
          top: 0,
          alignSelf: 'start',
          height: '100vh',
          overflowY: 'auto',
        }}>
          <Link href="/essays" style={{ fontSize: 11, color: 'var(--ink-faint)', textDecoration: 'none', fontFamily: 'var(--font-sans)', letterSpacing: '0.05em', display: 'block', marginBottom: 12 }}>
            ← Essays
          </Link>
          <div style={{ height: 1, background: 'var(--rule)', marginBottom: 12 }} />
          <div style={{ fontSize: 10, letterSpacing: '0.2em', fontWeight: 700, marginBottom: 10, fontFamily: 'var(--font-sans)', color: 'var(--ink-faint)', textTransform: 'uppercase' }}>
            All essays
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7, fontFamily: 'var(--font-sans)' }}>
            {allEssays.map(e => (
              <Link
                key={e.slug}
                href={`/essays/${e.slug}`}
                style={{
                  fontSize: 11,
                  color: e.slug === essay.slug ? 'var(--accent)' : 'var(--ink-faint)',
                  fontWeight: e.slug === essay.slug ? 600 : 400,
                  textDecoration: 'none',
                  lineHeight: 1.4,
                }}
              >
                {e.title}
              </Link>
            ))}
          </div>
        </aside>

        <main className="main-col" style={{ padding: '44px 52px', maxWidth: 740 }}>
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--rule)',
            paddingBottom: 28,
            marginBottom: 40,
          }}>
            <div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
                <p style={{ margin: 0, fontSize: 11, color: 'var(--ink-faint)', fontFamily: 'var(--font-sans)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {formatEssayDate(essay.date)}
                </p>
                {essay.status !== 'finished' && (
                  <span style={{ fontSize: 10, color: 'var(--ink-faint)', fontFamily: 'var(--font-sans)', letterSpacing: '0.1em', textTransform: 'uppercase', border: '1px solid var(--rule)', padding: '1px 6px', borderRadius: 3 }}>
                    {essay.status}
                  </span>
                )}
              </div>
              <h1 style={{ fontSize: 36, fontWeight: 700, margin: '0 0 10px', lineHeight: 1.1, fontFamily: 'var(--font-sans)', letterSpacing: '-0.02em', color: 'var(--ink)' }}>
                {essay.title}
              </h1>
              {essay.description && (
                <p style={{ margin: 0, fontSize: 18, color: 'var(--ink-soft)', lineHeight: 1.5 }}>
                  {essay.description}
                </p>
              )}
              {essay.tags.length > 0 && (
                <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
                  {essay.tags.map(tag => (
                    <Link key={tag} href={`/essays#${tag}`} style={{ fontSize: 11, color: 'var(--ink-faint)', fontFamily: 'var(--font-sans)', textDecoration: 'none', border: '1px solid var(--rule)', padding: '2px 8px', borderRadius: 3 }}>
                      {tag}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <div style={{ flexShrink: 0, marginLeft: 16 }}>
              <ThemeToggle />
            </div>
          </div>

          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: essay.content }}
          />

          <div style={{ marginBottom: 60 }} />
        </main>
      </div>
    </div>
  )
}
