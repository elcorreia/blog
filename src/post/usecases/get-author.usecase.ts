import { PostOutput } from '../dto/post-output.dto'
import { PostRepository } from '../repositories/post.repository'

export namespace GetAuthorUsecase {
  export type Input = {
    id: string
  }

  export type Output = PostOutput

  export class Usecase {
    constructor(private postRepository: PostRepository) {}

    async execute(input: Input): Promise<Output> {
      const { id } = input
      const post = await this.postRepository.findPostById(id)
      return post
    }
  }
}
