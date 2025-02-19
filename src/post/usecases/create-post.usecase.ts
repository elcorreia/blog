import { Injectable } from '@nestjs/common'
import { PostRepository } from '../repositories/post.repository'
import { CreatePostInput } from '../dto/create-post.input'
import { PostVisibility } from '@prisma/client'
import slugify from 'slugify'
import { ConflictError } from '@/shared/erros/conflict-error'
import { PostOutput } from '../dto/post-output.dto'
import { plainToInstance } from 'class-transformer'

@Injectable()
export class CreatePostUseCase {
  constructor(private readonly postRepository: PostRepository) {
  }

  async execute(userId: string, input: CreatePostInput): Promise<PostOutput> {

    const slug = slugify(input.title, { lower: true })

    const slugExists = await this.postRepository.findBySlug(slug)
    if (slugExists) {
      throw new ConflictError('Title used by other post')
    }

    const newPost = await this.postRepository.createPost({
      title: input.title,
      content: input.content,
      slug,
      imageUrl: input.imageUrl,
      published: input.published ?? false,
      visibility: input.visibility ?? PostVisibility.PUBLIC,
      isAnonymous: input.isAnonymous ?? false,
      location: input.location,
      lessonLearned: input.lessonLearned,
      user: {
        connect: {
          id: userId,
        },
      },
    })


    return plainToInstance(PostOutput, newPost)
  }
}
