export interface Project {
  id: string
  name: string
  role: string
  dates: string
  bullets: string[]
  tier: 'primary' | 'secondary'
  color: string
}

export const projects: Project[] = [
  // Primary tier (5 projects, inner ring)
  {
    id: 'onekeyflow',
    name: 'OneKeyFlow',
    role: 'Founder',
    dates: 'Feb 2026 – Present',
    bullets: [
      'Founded an AI automation agency building workflows for businesses that save time and money.',
      'Built an automation for a $45m/yr ecom company that turned a 23-hr manual process into a few minutes by generating financial reports for 70+ SKUs.',
      'Integrated a CRM into lead capture for a $2M auto-transport logistics company.',
    ],
    tier: 'primary',
    color: '#C4781A',
  },
  {
    id: 'ispy',
    name: 'ISPY',
    role: '',
    dates: '',
    bullets: [],
    tier: 'primary',
    color: '#6366F1',
  },
  {
    id: 'valandar',
    name: 'Valandar',
    role: 'Cofounder',
    dates: 'Jan – Feb 2026',
    bullets: [
      'Built a Word add-in that cut contract review from 6 hours to 20 minutes for 30 documents per month.',
      'Full-stack: Python, OpenAI Responses API, JavaScript (Word.js API), Django, Heroku.',
      'Makes it easy for lawyers at mid-size firms to run contracts through their clause playbooks.',
    ],
    tier: 'primary',
    color: '#0EA5E9',
  },
  {
    id: 'fairquanta',
    name: 'Fairquanta',
    role: 'AI Engineer & Product Developer',
    dates: 'Dec 2025 – Feb 2026',
    bullets: [
      'Researched AI memory systems, long-horizon task planning, collaborative filtering, and psychometrics to shape the architecture, UI, and product direction of a team-coordination AI platform.',
    ],
    tier: 'primary',
    color: '#10B981',
  },
  {
    id: 'midtronics',
    name: 'Midtronics',
    role: 'Embedded Software Engineer',
    dates: 'May 2023 – Nov 2025',
    bullets: [
      'Built and architected C firmware for an EV battery module balancer in a team of 3, from concept to live demo in Japan in 8 months.',
      'Wrote internal dev tools: Jira REST API scripts, signal monitors (ADC, GPIO, Serial, PWMs), and calibration tools.',
      'Ran a successful AI development workshop for 20+ embedded engineers on safe AI dev practices.',
    ],
    tier: 'primary',
    color: '#F59E0B',
  },
  // Secondary tier (2 projects, outer ring, 65% opacity)
  {
    id: 'slabfolio',
    name: 'Slabfolio',
    role: 'Founder',
    dates: 'Nov – Dec 2025',
    bullets: [
      'A better padfolio built to be minimal, clean, and not-leather.',
      'Built a Shopify store, designed landing page, and networked with potential users (Mom Test).',
      'First e-commerce exploration: learned COGS, RoAS, Revenue, Profit, and physical product design.',
    ],
    tier: 'secondary',
    color: '#8B5CF6',
  },
  {
    id: 'soulprint',
    name: 'Soulprint',
    role: 'Founder',
    dates: 'Jan 2025 – Present',
    bullets: [
      'Interviewed people about their past, present, and aspirations to uncover patterns in their lives.',
      'Mined their story with AI to find core patterns and inclinations in the subtext.',
      'Coached biweekly to align with these insights and integrate.',
    ],
    tier: 'secondary',
    color: '#EC4899',
  },
]
