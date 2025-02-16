import { Author } from '@/authors/graphql/models/author'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Post {
  @Field()
  id: string

  @Field()
  title: string

  @Field()
  slug: string

  @Field()
  content: string

  @Field(() => Author)
  author?: Author
  authorId: string

  @Field(() => Boolean)
  published?: boolean

  @Field()
  createdAt: Date
}
