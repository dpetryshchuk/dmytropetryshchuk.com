'use client'

import { useState } from 'react'
import Image from 'next/image'

const paintings = [
  { src: '/watercolor-basecampmoon.jpg', name: 'Basecamp Moon' },
  { src: '/watercolor-california.jpg',   name: 'California'     },
  { src: '/watercolor-finland.jpg',      name: 'Finland'        },
  { src: '/watercolor-sweden.jpg',       name: 'Sweden'         },
]

export function WatercolorsPanel() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)

  return (
    <>
      <div className="p-6 pt-12">
        <h2 className="font-fraunces text-xl text-ink">Watercolors</h2>
        <p className="font-mono text-xs text-neutral-400 mt-1 uppercase tracking-widest">Paintings</p>
      </div>

      <div className="grid grid-cols-2 gap-4 p-6 pt-2">
        {paintings.map((painting) => (
          <div key={painting.src}>
            <button
              className="cursor-zoom-in group overflow-hidden rounded-lg"
              onClick={() => setLightboxSrc(painting.src)}
            >
              <Image
                src={painting.src}
                width={400}
                height={280}
                alt={painting.name}
                style={{ objectFit: 'cover' }}
                className="group-hover:scale-105 transition-transform duration-300"
              />
            </button>
            <p className="font-mono text-[10px] text-neutral-400 mt-1 text-left">{painting.name}</p>
          </div>
        ))}
      </div>

      {lightboxSrc !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-[200] flex items-center justify-center cursor-zoom-out"
          onClick={() => setLightboxSrc(null)}
        >
          <button
            className="absolute top-4 right-4 font-mono text-xs text-white/60 hover:text-white"
            onClick={() => setLightboxSrc(null)}
          >
            ✕
          </button>
          <div className="relative w-[88vw] h-[88vh]">
            <Image
              src={lightboxSrc}
              fill
              alt=""
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
      )}
    </>
  )
}
