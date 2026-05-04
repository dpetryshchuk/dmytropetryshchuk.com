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
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '20px 24px 80px' }}>

        {/* ── Header ──────────────────────────────────────────────────────────── */}
        <header style={{ textAlign: 'center', marginBottom: 28 }}>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontVariant: 'small-caps',
            fontSize: '2.2em',
            fontWeight: 700,
            lineHeight: 1.2,
            color: 'var(--ink)',
            margin: '0 0 0.45em',
          }}>
            {essay.title}
          </h1>

          {essay.tags.length > 0 && (
            <p style={{ margin: '0 0 0.45em', fontSize: '0.88em' }}>
              {essay.tags.map((tag, i) => (
                <span key={tag}>
                  {i > 0 && <span style={{ color: 'var(--ink-faint)' }}>, </span>}
                  <Link href={`/#${tag}`} style={{ fontStyle: 'italic' }}>{tag}</Link>
                </span>
              ))}
            </p>
          )}

          {essay.description && (
            <p style={{
              margin: '0 0 0.7em',
              fontStyle: 'italic',
              fontSize: '0.97em',
              lineHeight: 1.55,
              color: 'var(--ink-soft)',
            }}>
              {essay.description}
            </p>
          )}

          <p style={{
            margin: 0,
            fontSize: '0.75em',
            fontFamily: 'var(--font-sans)',
            color: 'var(--ink-faint)',
            letterSpacing: '0.02em',
          }}>
            {formatEssayDate(essay.date)}
            {essay.status !== 'finished' && (
              <span> · {essay.status}</span>
            )}
          </p>
        </header>

        {/* ── Separator ───────────────────────────────────────────────────────── */}
        <div style={{
          border: '1px solid var(--rule)',
          background: 'var(--paper-deep)',
          height: 24,
          marginBottom: 36,
        }} />

        {/* ── Body ────────────────────────────────────────────────────────────── */}
        <div
          className="article-body"
          dangerouslySetInnerHTML={{ __html: essay.content }}
        />

        {/* ── Backlinks ───────────────────────────────────────────────────────── */}
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
