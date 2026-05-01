export interface Article {
  slug: string
  title: string
  description: string
  pubDate: string
  content: string
  imageUrl?: string
}

const FEED_URL = 'https://rss.beehiiv.com/feeds/r8iKiey4Ae.xml'

function extractCdata(block: string, tag: string): string {
  const re = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, 'i')
  const m = block.match(re)
  return m ? m[1].trim() : ''
}

function extractText(block: string, tag: string): string {
  const re = new RegExp(`<${tag}[^>]*>([^<]*)<\\/${tag}>`, 'i')
  const m = block.match(re)
  return m ? m[1].trim() : ''
}

function extractAttr(block: string, tag: string, attr: string): string {
  const re = new RegExp(`<${tag}[^>]*\\s${attr}="([^"]*)"`, 'i')
  const m = block.match(re)
  return m ? m[1] : ''
}

function cleanHtml(html: string): string {
  return html
    .replace(/\s+style="[^"]*"/gi, '')
    .replace(/\s+class="[^"]*"/gi, '')
    .replace(/\s+data-[a-z-]+(?:="[^"]*")?/gi, '')
    .replace(/\s+id="[^"]*"/gi, '')
    .replace(/<div>\s*<\/div>/gi, '')
    .replace(/<span>\s*<\/span>/gi, '')
}

function slugFromUrl(url: string): string {
  const parts = url.split('/p/')
  if (parts.length > 1) return parts[1].replace(/\/$/, '')
  return url.split('/').filter(Boolean).pop() ?? ''
}

export async function getArticles(): Promise<Article[]> {
  const res = await fetch(FEED_URL, { next: { revalidate: 3600 } })
  const xml = await res.text()

  const items = xml.split('<item>').slice(1)

  return items
    .map(item => {
      const end = item.indexOf('</item>')
      const block = end > -1 ? item.slice(0, end) : item

      const title = extractCdata(block, 'title') || extractText(block, 'title')
      const description = extractCdata(block, 'description') || extractText(block, 'description')
      const rawContent = extractCdata(block, 'content:encoded')
      const link = extractText(block, 'link') || extractText(block, 'guid')
      const pubDate = extractText(block, 'pubDate')
      const imageUrl = extractAttr(block, 'enclosure', 'url')

      return {
        slug: slugFromUrl(link),
        title,
        description,
        pubDate,
        content: cleanHtml(rawContent),
        imageUrl: imageUrl || undefined,
      }
    })
    .filter(a => a.slug && a.title)
}

export async function getArticle(slug: string): Promise<Article | undefined> {
  const articles = await getArticles()
  return articles.find(a => a.slug === slug)
}

export function formatDate(pubDate: string): string {
  if (!pubDate) return ''
  return new Date(pubDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
