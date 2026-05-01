'use client'

export function Canvas({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-paper">
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      {children}
    </div>
  )
}
