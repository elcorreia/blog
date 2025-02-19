import { PostDTO } from '../dto/post.dto'
import { faker } from '@faker-js/faker'
import { PostStatus, PostVisibility } from '@prisma/client'

export function PostDataBuilder(props: Partial<PostDTO>): Omit<PostDTO, 'id' | 'userId'> {
  return {
    title: props.title ?? faker.word.words(4),
    isAnonymous: props.isAnonymous ?? faker.datatype.boolean(),
    published: props.published ?? faker.datatype.boolean(),
    content: props.content ?? faker.lorem.paragraphs(5),

    // ✅ Gera um status aleatório baseado no enum PostStatus
    status: props.status ?? faker.helpers.arrayElement(Object.values(PostStatus)),
    visibility: props.visibility ?? faker.helpers.arrayElement(Object.values(PostVisibility)),
    createdAt: props.createdAt ?? new Date(),
    updatedAt: props.updatedAt ?? new Date()
  }
}
