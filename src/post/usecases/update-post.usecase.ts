import { Injectable } from '@nestjs/common';
import { PostRepository } from '../repositories/post.repository';
import { UpdatePostInput } from '../dto/update-post.input';
import slugify from 'slugify'
import { NotFoundError } from '@/shared/erros/not-found-error'

@Injectable()
export class UpdatePostUseCase {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(input: UpdatePostInput) {

    const existingPost = await this.postRepository.findById(input.id);

    if (!existingPost) {
      throw new NotFoundError('Post not found');
    }

    const updatedPost = {
      ...input,
      ...(input.title ? { slug: slugify(input.title) } : {}),
    };

    const updated = await this.postRepository.update(updatedPost);

    return updated;
  }
}
