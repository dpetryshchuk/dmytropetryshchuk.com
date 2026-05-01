'use client'

import Image from 'next/image'

export function AvatarCard() {
  return (
    <div className="drag-handle cursor-grab active:cursor-grabbing select-none group relative">
      <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-accent ring-offset-2 ring-offset-paper shadow-lg transition-transform duration-200 group-hover:scale-105">
        <Image
          src="/avatar.jpg"
          width={96}
          height={96}
          alt="Dmytro"
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          draggable={false}
        />
      </div>
    </div>
  )
}
