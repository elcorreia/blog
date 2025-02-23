import { PostOutput } from '../dto/post-output.dto'
import { PostRepository } from '../repositories/post.repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class GetPostUsecase {
    constructor(private postRepository: PostRepository) {}

    async execute(postId: string): Promise<PostOutput> {
      const post = await this.postRepository.findById(postId)
      return post
    }

}
