import { SearchInput } from '@/shared/dto/search-input'
import { PostOutput } from '../dto/post-output.dto'
import { PostRepository } from '../repositories/post.repository'
import { PaginationOutput } from '@/shared/dto/pagination-output'
import { Injectable } from '@nestjs/common'


@Injectable()
export class ListPostsUsecase {

  constructor(private readonly postRepository: PostRepository) {}

    async execute(input: SearchInput): Promise<PaginationOutput> {
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
