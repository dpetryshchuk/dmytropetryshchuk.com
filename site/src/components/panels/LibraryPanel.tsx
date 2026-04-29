import { librarySections } from '@/data/library'

export function LibraryPanel() {
  return (
    <div>
      <div className="p-6 pt-12">
        <h2 className="font-fraunces text-xl text-ink">Library</h2>
        <p className="font-mono text-xs text-neutral-400 mt-1 uppercase tracking-widest">
          Books and podcasts I keep coming back to.
        </p>
      </div>

      {librarySections.map((section, si) => (
        <section key={si} className="px-6 pb-6">
          <h3 className="font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-400 mb-3 pb-1 border-b border-neutral-100">
            {section.label}
          </h3>

          {section.items.map((item, i) => (
            <div
              key={i}
              className="flex items-baseline gap-2 py-1.5 border-b border-neutral-50 last:border-0"
            >
              <span className="font-mono text-[9px] text-neutral-300 w-3 shrink-0">
                {item.type === 'podcast' ? '♪' : '·'}
              </span>
              <div className="min-w-0">
                <span className="font-inter text-sm text-ink">{item.title}</span>
                {item.author && (
                  <span className="font-inter text-xs text-neutral-400 ml-2">— {item.author}</span>
                )}
              </div>
            </div>
          ))}
        </section>
      ))}
    </div>
  )
}
