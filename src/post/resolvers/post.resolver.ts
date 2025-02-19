import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PostDTO } from '../dto/post.dto';
import { CreatePostInput } from '../dto/create-post.input';
import { UpdatePostInput } from '../dto/update-post.input';
import { PostRepository } from '../repositories/post.repository';
import { CreatePostUseCase } from '../usecases/create-post.usecase';
import { UpdatePostUseCase } from '../usecases/update-post.usecase';
import { PostOutput } from '@/post/dto/post-output.dto'

@Resolver(() => PostDTO)
export class PostResolver {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly createPostUseCase: CreatePostUseCase,
    private readonly updatePostUseCase: UpdatePostUseCase,
  ) {}

  @Query(() => [PostDTO], { name: 'posts' })
  async getPosts() {
    return this.postRepository.findAllPosts();
  }

  @Query(() => PostDTO, { name: 'postById', nullable: true })
  async getPostById(@Args('postId') postId: string) {
    return this.postRepository.findPostById(postId);
  }

  @Mutation(() => PostOutput)
  async createPost(
    @Args('userId') userId: string,
    @Args('data') data: CreatePostInput,
  ) {
    return this.createPostUseCase.execute(userId, data);
  }

  @Mutation(() => PostDTO)
  async updatePost(@Args('data') data: UpdatePostInput) {
    return this.updatePostUseCase.execute(data);
  }

  @Mutation(() => PostDTO)
  async deletePost(@Args('postId') postId: string) {
    return this.postRepository.deletePost(postId);
  }
}
