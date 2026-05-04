import Link from 'next/link'
import { projects } from '@/data/projects'

export default function ProjectsPage() {
  const work = projects.filter(p => p.category === 'work')
  const experiments = projects.filter(p => p.category === 'experiment')

  return (
    <div style={{ background: 'var(--paper)', minHeight: '100vh' }}>
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '20px 32px 80px' }}>

        {[{ label: 'Work', items: work }, { label: 'Experiments', items: experiments }].map(({ label, items }) => (
          <div key={label} style={{ marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-sans)', color: 'var(--ink-faint)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>
              {label}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {items.map(p => (
                <div key={p.id} style={{ paddingLeft: 14, borderLeft: '2px solid var(--rule)' }}>
                  <div style={{ marginBottom: p.bullets.length > 0 ? 6 : 0 }}>
                    <span style={{ fontSize: 16, fontWeight: 600, fontFamily: 'var(--font-sans)', color: 'var(--ink)' }}>
                      {p.name}
                    </span>
                    {p.role && (
                      <span style={{ fontSize: 13, color: 'var(--ink-faint)', marginLeft: 8, fontFamily: 'var(--font-sans)' }}>
                        · {p.role}
                      </span>
                    )}
                    {p.dates && (
                      <span style={{ fontSize: 12, color: 'var(--ink-faint)', marginLeft: 6, fontFamily: 'var(--font-sans)' }}>
                        {p.dates}
                      </span>
                    )}
                  </div>
                  {p.bullets.length > 0 && (
                    <ul style={{ margin: 0, padding: '0 0 0 18px', fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.7 }}>
                      {p.bullets.map((b, i) => (
                        <li key={i} style={{ marginBottom: 3 }}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}
