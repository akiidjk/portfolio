export interface ProjectDetailItem {
  label: string
  value: string
}

export interface Project {
  id: string
  slug: string
  title: string
  subtitle: string
  stack: string[]
  year: string
  status: string
  domain: string
  description: string
  detail: ProjectDetailItem[]
  problem: string
  approach: string
  outcome: string
  featured: boolean
  image: string
}

export interface LabItem {
  id: string
  title: string
  type: string
  result: string
  year: string
}

export interface ArchiveEntry {
  year: string
  event: string
  org: string
  type: string
}
