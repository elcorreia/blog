import { Field, Int, ObjectType } from '@nestjs/graphql'
import { PostDTO } from './post.dto'

@ObjectType()
export class SearchAuthorsResult {
  @Field(() => [PostDTO])
  items: PostDTO[]

  @Field(() => Int)
  currentPage: number

  @Field(() => Int)
  perPage: number

  @Field(() => Int)
  lastPage: number

  @Field(() => Int)
  total: number
}
