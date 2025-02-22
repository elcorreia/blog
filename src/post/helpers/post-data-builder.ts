import { PostDTO } from '../dto/post.dto'
import { faker } from '@faker-js/faker'
import { PostStatus, PostVisibility } from '@prisma/client'
import slugify from 'slugify'

export function PostDataBuilder(props: Partial<PostDTO>): Omit<PostDTO, 'id' | 'userId'> {
  const title = props.title ?? faker.word.words(3)

  return {
    title,
    slug: props.slug ?? slugify(title, { lower: true }),
    isAnonymous: props.isAnonymous ?? faker.datatype.boolean(),
    published: props.published ?? faker.datatype.boolean(),
    content: props.content ?? faker.lorem.paragraphs(5),
    lessonLearned: props.lessonLearned ?? faker.lorem.paragraphs(5),
    imageUrl: props.imageUrl ?? faker.image.avatar(),
    location: props.location ?? faker.location.country(),// todo

    // ✅ Gera um status aleatório baseado no enum PostStatus
    status: props.status ?? faker.helpers.arrayElement(Object.values(PostStatus)),
    visibility: props.visibility ?? faker.helpers.arrayElement(Object.values(PostVisibility)),
    createdAt: props.createdAt ?? new Date(),
    updatedAt: props.updatedAt ?? new Date()
  }
}
