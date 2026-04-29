'use client'

export function IntroCard() {
  return (
    <div className="drag-handle cursor-grab active:cursor-grabbing bg-white rounded-xl shadow-md p-6 w-[300px] select-none">
      <h1 className="font-fraunces text-[22px] font-semibold text-ink leading-tight">
        Dmytro Petryshchuk
      </h1>
      <p className="mt-1.5 font-inter text-sm text-neutral-500 leading-relaxed">
        Builder. Curious about people and systems.
      </p>
      <div className="mt-5 flex gap-4 font-mono text-[11px] text-accent">
        <a
          href="mailto:dmytrodim@gmail.com"
          className="hover:underline transition-opacity hover:opacity-80"
          onClick={(e) => e.stopPropagation()}
        >
          Email
        </a>
        <a
          href="https://github.com/dmytropetryshchuk"
          target="_blank"
          rel="noreferrer"
          className="hover:underline transition-opacity hover:opacity-80"
          onClick={(e) => e.stopPropagation()}
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/dmytropetryshchuk"
          target="_blank"
          rel="noreferrer"
          className="hover:underline transition-opacity hover:opacity-80"
          onClick={(e) => e.stopPropagation()}
        >
          LinkedIn
        </a>
      </div>
    </div>
  )
}
