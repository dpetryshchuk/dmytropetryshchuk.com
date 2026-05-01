export interface LibraryItem {
  title: string
  author: string
  type: 'book' | 'podcast'
}

export interface LibrarySection {
  label: string
  items: LibraryItem[]
}

export const librarySections: LibrarySection[] = [
  {
    label: 'Philosophy & Spirituality',
    items: [
      { title: 'Meditations', author: 'Marcus Aurelius', type: 'book' },
      { title: 'Siddhartha', author: 'Hermann Hesse', type: 'book' },
      { title: 'The Little Prince', author: 'Antoine de Saint-Exupéry', type: 'book' },
      { title: "Man's Search for Meaning", author: 'Viktor Frankl', type: 'book' },
      { title: 'The Untethered Soul', author: 'Michael Singer', type: 'book' },
      { title: "The Heart of the Buddha's Teachings", author: 'Thich Nhat Hanh', type: 'book' },
      { title: 'The Way to Love', author: 'Anthony de Mello', type: 'book' },
    ],
  },
  {
    label: 'Self-Improvement & Psychology',
    items: [
      { title: '7 Habits of Highly Effective People', author: 'Stephen Covey', type: 'book' },
      { title: 'Psycho-Cybernetics', author: 'Maxwell Maltz', type: 'book' },
      { title: 'Essentialism', author: 'Greg McKeown', type: 'book' },
      { title: 'Wishcraft', author: 'Barbara Sher', type: 'book' },
    ],
  },
  {
    label: 'Relationships & Communication',
    items: [
      { title: 'Models', author: 'Mark Manson', type: 'book' },
      { title: 'Supercommunicators', author: 'Charles Duhigg', type: 'book' },
    ],
  },
  {
    label: 'Business & Leadership',
    items: [
      { title: 'The Mom Test', author: 'Rob Fitzpatrick', type: 'book' },
      { title: 'Straight Line Leadership', author: 'Dusan Djukich', type: 'book' },
      { title: 'Rework', author: 'Jason Fried & David Heinemeier Hansson', type: 'book' },
    ],
  },
  {
    label: 'Mastery & Skill',
    items: [
      { title: 'Mastery', author: 'Robert Greene', type: 'book' },
    ],
  },
  {
    label: 'Fiction & Memoir',
    items: [
      { title: 'Three Body Problem Series', author: 'Liu Cixin', type: 'book' },
      { title: 'The Stormlight Archive', author: 'Brandon Sanderson', type: 'book' },
      { title: 'When Breath Becomes Air', author: 'Paul Kalanithi', type: 'book' },
    ],
  },
  {
    label: 'Listening',
    items: [
      { title: 'Joe Hudson', author: '', type: 'podcast' },
      { title: 'My First Million', author: '', type: 'podcast' },
    ],
  },
]
