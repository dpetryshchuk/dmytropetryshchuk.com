import Link from 'next/link'
import { getArticles, formatDate } from '@/lib/feed'


export const revalidate = 3600

export default async function WritingPage() {
  const articles = await getArticles()

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
          <div style={{ fontSize: 10, letterSpacing: '0.28em', fontVariant: 'small-caps', fontWeight: 600, marginBottom: 10, fontFamily: 'var(--font-sans)', color: 'var(--ink-faint)' }}>
            Posts
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7, fontFamily: 'var(--font-sans)' }}>
            {articles.map(article => (
              <Link
                key={article.slug}
                href={`/writing/${article.slug}`}
                style={{ fontSize: 11, color: 'var(--ink-faint)', textDecoration: 'none', lineHeight: 1.4 }}
              >
                {article.title}
              </Link>
            ))}
          </div>
        </aside>

        <main className="main-col" style={{ padding: '44px 52px', maxWidth: 740 }}>
          <div style={{
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
              Building Log
            </h1>
          </div>

          <div>
            {articles.map(article => (
              <Link
                key={article.slug}
                href={`/writing/${article.slug}`}
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              >
                <div style={{
                  padding: '18px 0',
                  borderBottom: '1px solid var(--rule)',
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    gap: 16,
                    marginBottom: article.description ? 5 : 0,
                  }}>
                    <span style={{
                      fontSize: 16,
                      fontWeight: 600,
                      fontFamily: 'var(--font-sans)',
                      color: 'var(--ink)',
                      letterSpacing: '-0.01em',
                    }}>
                      {article.title}
                    </span>
                    <span style={{
                      fontSize: 12,
                      color: 'var(--ink-faint)',
                      fontFamily: 'var(--font-sans)',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}>
                      {formatDate(article.pubDate)}
                    </span>
                  </div>
                  {article.description && (
                    <p style={{
                      margin: 0,
                      fontSize: 15,
                      color: 'var(--ink-soft)',
                      lineHeight: 1.6,
                    }}>
                      {article.description}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>

          <div style={{ marginBottom: 60 }} />
        </main>
      </div>
    </div>
  )
}
