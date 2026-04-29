export function WritingsPanel() {
  return (
    <div>
      {/* Header */}
      <div className="p-6 pt-12">
        <h2 className="font-fraunces text-xl text-ink">Writings</h2>
        <p className="font-mono text-xs text-neutral-400 mt-1 uppercase tracking-widest">
          Essays
        </p>
      </div>

      {/* Essays section */}
      <section className="px-6 pb-6">
        <h3 className="font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-400 mb-3 pb-1 border-b border-neutral-100">
          Essays
        </h3>

        {/* Each essay is a title link */}
        <a
          href="#"
          className="block py-2 border-b border-neutral-50 last:border-0 group"
        >
          <span className="font-fraunces text-base text-ink group-hover:text-accent transition-colors">
            IMA Design
          </span>
          <span className="block font-mono text-[10px] text-neutral-400 mt-0.5">
            On building a coaching AI
          </span>
        </a>
      </section>

      {/* More coming soon note */}
      <p className="px-6 font-mono text-[10px] text-neutral-300 italic">
        More coming soon.
      </p>
    </div>
  )
}
