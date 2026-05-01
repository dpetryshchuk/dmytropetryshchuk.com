export function WritingsPanel() {
  return (
    <div>
      <div className="p-6 pt-12">
        <h2 className="font-fraunces text-2xl text-white">Writings</h2>
        <p className="font-mono text-xs text-white/40 mt-1 uppercase tracking-widest">Essays</p>
      </div>

      <section className="px-6 pb-6">
        <h3 className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/30 mb-3 pb-1 border-b border-white/10">
          Essays
        </h3>

        <a
          href="#"
          className="block py-3 border-b border-white/5 last:border-0 group"
        >
          <span className="font-fraunces text-lg text-white/85 group-hover:text-white transition-colors duration-150">
            IMA Design
          </span>
          <span className="block font-mono text-[10px] text-white/35 mt-0.5">
            On building a coaching AI
          </span>
        </a>
      </section>

      <p className="px-6 font-mono text-[10px] text-white/20 italic">More coming soon.</p>
    </div>
  )
}
