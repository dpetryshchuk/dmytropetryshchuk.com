import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getArticles, getArticle, formatDate } from '@/lib/feed'


export const revalidate = 3600

export async function generateStaticParams() {
  const articles = await getArticles()
  return articles.map(a => ({ slug: a.slug }))
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) notFound()

  const allArticles = await getArticles()

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
          <Link href="/writing" style={{
            fontSize: 11,
            color: 'var(--ink-faint)',
            textDecoration: 'none',
            fontFamily: 'var(--font-sans)',
            letterSpacing: '0.05em',
            display: 'block',
            marginBottom: 12,
          }}>
            ← All posts
          </Link>
          <div style={{ height: 1, background: 'var(--rule)', marginBottom: 12 }} />
          <div style={{ fontSize: 10, letterSpacing: '0.28em', fontVariant: 'small-caps', fontWeight: 600, marginBottom: 10, fontFamily: 'var(--font-sans)', color: 'var(--ink-faint)' }}>
            Posts
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7, fontFamily: 'var(--font-sans)' }}>
            {allArticles.map(a => (
              <Link
                key={a.slug}
                href={`/writing/${a.slug}`}
                style={{
                  fontSize: 11,
                  color: a.slug === slug ? 'var(--accent)' : 'var(--ink-faint)',
                  textDecoration: 'none',
                  lineHeight: 1.4,
                  fontWeight: a.slug === slug ? 600 : 400,
                }}
              >
                {a.title}
              </Link>
            ))}
          </div>
        </aside>

        <main className="main-col" style={{ padding: '44px 52px', maxWidth: 740 }}>
          <div style={{
            borderBottom: '1px solid var(--rule)',
            paddingBottom: 28,
            marginBottom: 40,
          }}>
            <div>
              <p style={{
                margin: '0 0 10px',
                fontSize: 11,
                color: 'var(--ink-faint)',
                fontFamily: 'var(--font-sans)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}>
                {formatDate(article.pubDate)}
              </p>
              <h1 style={{
                fontSize: 36,
                fontWeight: 700,
                margin: '0 0 10px',
                lineHeight: 1.1,
                fontFamily: 'var(--font-sans)',
                letterSpacing: '-0.02em',
                color: 'var(--ink)',
              }}>
                {article.title}
              </h1>
              {article.description && (
                <p style={{
                  margin: 0,
                  fontSize: 18,
                  color: 'var(--ink-soft)',
                  lineHeight: 1.5,
                }}>
                  {article.description}
                </p>
              )}
            </div>
          </div>

          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <div style={{ marginBottom: 60 }} />
        </main>
      </div>
    </div>
  )
}
