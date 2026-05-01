import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

const ESSAYS_DIR = path.join(process.cwd(), 'content/essays')

export interface Essay {
  slug: string
  title: string
  date: string
  tags: string[]
  description: string
  status: 'draft' | 'in-progress' | 'finished'
  content: string
}

export function getEssaySlugs(): string[] {
  if (!fs.existsSync(ESSAYS_DIR)) return []
  return fs.readdirSync(ESSAYS_DIR)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace(/\.md$/, ''))
}

export function getEssay(slug: string): Essay | undefined {
  const filePath = path.join(ESSAYS_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) return undefined

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ? String(data.date) : '',
    tags: Array.isArray(data.tags) ? data.tags : [],
    description: data.description ?? '',
    status: data.status ?? 'draft',
    content: marked(content) as string,
  }
}

export function getEssays(): Essay[] {
  return getEssaySlugs()
    .map(slug => getEssay(slug))
    .filter(Boolean) as Essay[]
}

export function formatEssayDate(date: string): string {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
