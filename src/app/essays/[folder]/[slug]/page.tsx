import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getEssay, getEssayParams, getBacklinks, formatEssayDate } from '@/lib/essays'

export function generateStaticParams() {
  return getEssayParams()
}

export default async function EssayPage({ params }: { params: Promise<{ folder: string; slug: string }> }) {
  const { folder, slug } = await params
  const essay = getEssay(folder, slug)
  if (!essay) notFound()

  const backlinks = getBacklinks(folder, slug)

  return (
    <div style={{ background: 'var(--paper)', minHeight: '100vh' }}>
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '40px 24px 80px' }}>

        {/* ── Back link ───────────────────────────────────────────────────── */}
        <div style={{ marginBottom: 32 }}>
          <Link href="/" style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.65em',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--ink-faint)',
            textDecoration: 'none',
          }}>
            ← Dmytro Petryshchuk
          </Link>
        </div>

        {/* ── Essay header ────────────────────────────────────────────────── */}
        <header style={{ marginBottom: 40, borderBottom: '1px solid var(--rule)', paddingBottom: 24 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 }}>
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.6em',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--ink-faint)',
            }}>
              {formatEssayDate(essay.date)}
            </span>
            {essay.status !== 'finished' && (
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.55em',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--ink-faint)',
                border: '1px solid var(--rule)',
                padding: '1px 6px',
              }}>
                {essay.status}
              </span>
            )}
          </div>

          <h1 style={{
            margin: '0 0 12px',
            fontSize: '1.6em',
            fontWeight: 400,
            lineHeight: 1.25,
            fontFamily: 'var(--font-serif)',
            color: 'var(--ink)',
          }}>
            {essay.title}
          </h1>

          {essay.description && (
            <p style={{ margin: '0 0 12px', fontSize: '0.95em', color: 'var(--ink-soft)', lineHeight: 1.5 }}>
              {essay.description}
            </p>
          )}

          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <Link href={`/#${essay.folder}`} style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.6em',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--ink-faint)',
              textDecoration: 'none',
              border: '1px solid var(--rule)',
              padding: '2px 8px',
            }}>
              {essay.folder}
            </Link>
            {essay.tags.filter(t => t !== essay.folder).map(tag => (
              <span key={tag} style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.6em',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--ink-faint)',
                border: '1px solid var(--rule)',
                padding: '2px 8px',
              }}>
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* ── Body ────────────────────────────────────────────────────────── */}
        <div
          className="article-body"
          dangerouslySetInnerHTML={{ __html: essay.content }}
        />

        {/* ── Backlinks ───────────────────────────────────────────────────── */}
        {backlinks.length > 0 && (
          <div style={{ marginTop: 52, borderTop: '1px solid var(--rule)', paddingTop: 20 }}>
            <div style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.6em',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--ink-faint)',
              marginBottom: 10,
            }}>
              Linked from
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {backlinks.map(b => (
                <Link
                  key={`${b.folder}/${b.slug}`}
                  href={`/essays/${b.folder}/${b.slug}`}
                  style={{ fontSize: '0.85em', color: 'var(--ink-soft)' }}
                >
                  {b.title}
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
