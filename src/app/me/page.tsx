import { notFound } from 'next/navigation'
import { getEssay } from '@/lib/essays'
import { EmailCopy } from '@/components/EmailCopy'

export default function MePage() {
  const essay = getEssay('about', 'about')
  if (!essay) notFound()

  return (
    <div style={{ background: 'var(--paper)', minHeight: '100vh' }}>
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '20px 24px 80px' }}>

        <div
          className="article-body"
          dangerouslySetInnerHTML={{ __html: essay.content }}
        />

        <p style={{ marginTop: '1.2em' }}>
          Email me at <EmailCopy />.
        </p>

      </div>
    </div>
  )
}
