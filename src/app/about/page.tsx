import Link from 'next/link'
import { EmailCopy } from '@/components/EmailCopy'

function InlineLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={{ color: 'var(--accent)', textDecoration: 'none', borderBottom: '1px solid currentColor' }}
    >
      {children}
    </a>
  )
}

export default function AboutPage() {
  return (
    <div style={{ background: 'var(--paper)', minHeight: '100vh' }}>
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '48px 32px 80px' }}>

        <Link
          href="/"
          style={{ fontSize: 12, color: 'var(--ink-faint)', textDecoration: 'none', fontFamily: 'var(--font-sans)', display: 'block', marginBottom: 40 }}
        >
          ← Dmytro Petryshchuk
        </Link>

        <div style={{ fontSize: 18, lineHeight: 1.75, color: 'var(--ink)' }}>
          <p style={{ margin: '0 0 16px' }}>
            Hi, I'm <strong>Dmytro Petryshchuk</strong> (or Dima), an entrepreneur, engineer, writer, and worldbuilding nerd.
          </p>
          <p style={{ margin: '0 0 16px' }}>
            I'm the founder of{' '}
            <InlineLink href="https://www.onekeyflow.com">OneKeyFlow</InlineLink>
            , an AI automation agency where I help businesses use AI, build internal tools, and automate the slow manual work holding them back. Clients include a $45m/yr ecommerce company, a $3m/yr semiconductor fab, and a $2m/yr auto transport logistics company.
          </p>
          <p style={{ margin: '0 0 16px' }}>
            I worked at{' '}
            <InlineLink href="https://www.midtronics.com">Midtronics</InlineLink>
            , a $100M/yr battery technology company that develops next-generation charging, discharging, and testing equipment. There I spent three years as an embedded software engineer building these systems.
          </p>
          <p style={{ margin: '0 0 16px' }}>
            Before this, I worked with{' '}
            <InlineLink href="https://fairquanta.com">FairQuanta</InlineLink>
            {' '}as a founding engineer building and researching AI and UI/UX to improve group cohesion. I also built{' '}
            <InlineLink href="http://valandar.com/">Valandar AI</InlineLink>
            , a Word add-in for vendor agreement lawyers.
          </p>
          <p style={{ margin: '0 0 24px' }}>
            I'm a graduate of the University of Illinois at Urbana-Champaign, where I focused on neural circuits, embedded software, computer architecture, machine learning, and AI.
          </p>
          <p style={{ margin: '0 0 4px' }}>
            My resume is{' '}
            <a href="/resume.pdf" download style={{ color: 'var(--accent)', textDecoration: 'none', borderBottom: '1px solid currentColor' }}>
              here
            </a>.
          </p>
          <p style={{ margin: 0 }}>
            Email me at <EmailCopy />.
          </p>
        </div>

      </div>
    </div>
  )
}
