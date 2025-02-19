import { SearchInput } from '@/shared/dto/search-input'
import { PostOutput } from '../dto/post-output.dto'
import { PostRepository } from '../repositories/post.repository'
import { PaginationOutput } from '@/shared/dto/pagination-output'

export namespace ListAuthorsUsecase {
  export type Input = SearchInput

  export type Output = PaginationOutput<PostOutput>

  export class Usecase {
    constructor(private postRepository: PostRepository) {}

    async execute(input: Input): Promise<Output> {
      const searchResult = await this.postRepository.search(input)
      return {
        items: searchResult.items,
        total: searchResult.total,
        currentPage: searchResult.currentPage,
        perPage: searchResult.perPage,
        lastPage: searchResult.lastPage,
      }
    }
  }
}
