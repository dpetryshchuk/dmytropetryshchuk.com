import { librarySections } from '@/data/library'

export function LibraryPanel() {
  return (
    <div>
      <div className="p-6 pt-12">
        <h2 className="font-fraunces text-2xl text-white">Library</h2>
        <p className="font-mono text-xs text-white/40 mt-1 uppercase tracking-widest">
          Books and podcasts I keep coming back to.
        </p>
      </div>

      {librarySections.map((section, si) => (
        <section key={si} className="px-6 pb-6">
          <h3 className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/30 mb-3 pb-1 border-b border-white/10">
            {section.label}
          </h3>

          {section.items.map((item, i) => (
            <div
              key={i}
              className="flex items-baseline gap-2 py-2 border-b border-white/5 last:border-0"
            >
              <span className="font-mono text-[9px] text-white/25 w-3 shrink-0">
                {item.type === 'podcast' ? '♪' : '·'}
              </span>
              <div className="min-w-0">
                <span className="font-inter text-sm text-white/85">{item.title}</span>
                {item.author && (
                  <span className="font-inter text-xs text-white/35 ml-2">— {item.author}</span>
                )}
              </div>
            </div>
          ))}
        </section>
      ))}
    </div>
  )
}
