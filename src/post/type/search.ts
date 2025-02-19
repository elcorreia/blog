import { PostOutput } from '@/post/dto/post-output.dto'
import { Post } from '@prisma/client'

export type SearchParams = {
  page?: number
  perPage?: number
  filter?: string
  sort?: string
  sortDir?: 'asc' | 'desc'
}

export type SearchResult = {
  items: PostOutput[]
  currentPage: number
  perPage: number
  lastPage: number
  total: number
}
