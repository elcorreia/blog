import { Injectable } from '@nestjs/common';
import { PostRepository } from '../repositories/post.repository';
import { UpdatePostInput } from '../dto/update-post.input';

@Injectable()
export class UpdatePostUseCase {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(input: UpdatePostInput) {
    const existingPost = await this.postRepository.findPostById(input.postId);
    if (!existingPost) {
      throw new Error('Post not found');
    }

    const updated = await this.postRepository.updatePost({
      where: { id: input.postId },
      data: {
        title: input.title,
        content: input.content,
        imageUrl: input.imageUrl,
        published: input.published,
        isAnonymous: input.isAnonymous,
        visibility: input.visibility,
        location: input.location,
        lessonLearned: input.lessonLearned,
      },
    });

    return updated;
  }
}
