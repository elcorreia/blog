import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql'
import { PostDTO } from '../dto/post.dto';
import { CreatePostInput } from '../dto/create-post.input';
import { UpdatePostInput } from '../dto/update-post.input';
import { PostRepository } from '../repositories/post.repository';
import { CreatePostUseCase } from '../usecases/create-post.usecase';
import { UpdatePostUseCase } from '../usecases/update-post.usecase';
import { PostOutput } from '@/post/dto/post-output.dto'
import { SearchAuthorsResult } from '@/post/dto/search-authors-result'
import { ListPostsUsecase } from '@/post/usecases/list-posts.usecase'
import { SearchParamsArgs } from '@/shared/dto/search-params.args'
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { GqlAuthGuard } from '@/auth/guards/gql-auth.guard'

@Resolver(() => PostDTO)
export class PostResolver {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly createPostUseCase: CreatePostUseCase,
    private readonly updatePostUseCase: UpdatePostUseCase,
    private readonly listPostUseCase: ListPostsUsecase,
  ) {}

  @Query(() => [PostDTO], { name: 'posts' })
  async getPosts() {
    return this.postRepository.findAll();
  }

  @Query(() => SearchAuthorsResult)
  async getAllPosts(
    @Args() { page, perPage, sort, sortDir, filter }: SearchParamsArgs,
  ) {
    const list = await this.listPostUseCase.execute({
      page,
      perPage,
      sort,
      sortDir,
      filter,
    })
    return list
  }

  @Query(() => PostDTO, { name: 'postById', nullable: true })
  async getPostById(@Args('postId') postId: string) {
    return this.postRepository.findById(postId);
  }


  @UseGuards(GqlAuthGuard)
  @Mutation(() => PostOutput)
  async createPost(
    @Args('data') data: CreatePostInput,
    @Context() ctx,
  ) {
    return this.createPostUseCase.execute(ctx.req.user.userId, data);
  }

  @Mutation(() => PostDTO)
  async updatePost(@Args('data') data: UpdatePostInput) {
    return this.updatePostUseCase.execute(data);
  }

  @Mutation(() => PostDTO)
  async deletePost(@Args('id') id: string) {
    return this.postRepository.delete(id);
  }

}
