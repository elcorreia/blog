import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Author } from '../models/author';
import { Inject, UseGuards } from '@nestjs/common'
import { ListAuthorsUsecase } from '@/authors/usecases/list-authors.usecase'
import { SearchParamsArgs } from '../args/search-params.args'
import { SearchAuthorsResult } from '../models/search-authors-result'
import { CreateAuthorUsecase } from '@/authors/usecases/create-author.usecase'
import { CreateAuthorInput } from '../inputs/create-author.input'
import { GetAuthorUsecase } from '@/authors/usecases/get-author.usecase'
import { AuthorIdArgs } from '../args/author-id.args'
import { UpdateAuthorUsecase } from '@/authors/usecases/update-author.usecase'
import { UpdateAuthorInput } from '../inputs/update-author.input'
import { DeleteAuthorUsecase } from '@/authors/usecases/delete-author.usecase'
import { GqlAuthGuard } from '@/auth/guards/gql-auth.guard'

@Resolver(() => Author)
export class AuthorsResolver {

  @Inject(ListAuthorsUsecase.Usecase)
  private listAuthorUseCase: ListAuthorsUsecase.Usecase

  @Inject(CreateAuthorUsecase.Usecase)
  private createAuthorUseCase: CreateAuthorUsecase.Usecase

  @Inject(GetAuthorUsecase.Usecase)
  private getAuthorUseCase: GetAuthorUsecase.Usecase

  @Inject(UpdateAuthorUsecase.Usecase)
  private updateAuthorUseCase: UpdateAuthorUsecase.Usecase

  @Inject(DeleteAuthorUsecase.Usecase)
  private deleteAuthorUseCase: DeleteAuthorUsecase.Usecase

  @Query(() => SearchAuthorsResult)
  @UseGuards(GqlAuthGuard)
  async authors(
    @Args() { page, perPage, sort, sortDir, filter }: SearchParamsArgs,
  ) {
    const list = await this.listAuthorUseCase.execute({
      page,
      perPage,
      sort,
      sortDir,
      filter,
    })
    return list
  }

  @Query(() => Author)
  @UseGuards(GqlAuthGuard)
  async getAuthorById(@Args() { id }: AuthorIdArgs) {
    return this.getAuthorUseCase.execute({ id })
  }


  @Mutation(() => Author)
  @UseGuards(GqlAuthGuard)
  async createAuthor(@Args('data') data: CreateAuthorInput) {
    return this.createAuthorUseCase.execute(data)
  }

  @Mutation(() => Author)
  @UseGuards(GqlAuthGuard)
  async updateAuthor(
    @Args() { id }: AuthorIdArgs,
    @Args('data') data: UpdateAuthorInput,
  ) {
    return this.updateAuthorUseCase.execute({ id, ...data })
  }

  @Mutation(() => Author)
  @UseGuards(GqlAuthGuard)
  async deleteAuthor(@Args() { id }: AuthorIdArgs) {
    return this.deleteAuthorUseCase.execute({ id })
  }
}
