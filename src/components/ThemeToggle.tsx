'use client'

import { useEffect, useRef, useState } from 'react'

export function ThemeToggle() {
  const [dark, setDark] = useState(false)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = saved ? saved === 'dark' : prefersDark
    setDark(isDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  function apply(isDark: boolean) {
    setDark(isDark)
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
    setOpen(false)
  }

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Appearance settings"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: 'none',
          border: '1px solid var(--rule)',
          borderRadius: 6,
          cursor: 'pointer',
          padding: '5px 10px',
          fontSize: 12,
          fontFamily: 'var(--font-sans)',
          color: 'var(--ink-soft)',
          letterSpacing: '0.03em',
        }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
        Appearance
      </button>

      {open && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 6px)',
          right: 0,
          background: 'var(--paper)',
          border: '1px solid var(--rule)',
          borderRadius: 8,
          padding: 5,
          zIndex: 50,
          minWidth: 120,
          boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
        }}>
          {([
            { label: '☀︎  Light', value: false },
            { label: '☽  Dark',  value: true  },
          ] as const).map(({ label, value }) => (
            <button
              key={label}
              onClick={() => apply(value)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '7px 10px',
                border: 'none',
                borderRadius: 5,
                cursor: 'pointer',
                fontSize: 13,
                fontFamily: 'var(--font-sans)',
                background: dark === value ? 'var(--rule)' : 'transparent',
                color: dark === value ? 'var(--ink)' : 'var(--ink-soft)',
                fontWeight: dark === value ? 600 : 400,
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
