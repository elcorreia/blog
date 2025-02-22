import { Test, TestingModule } from '@nestjs/testing'
import { PrismaClient } from '@prisma/client'
import { execSync } from 'node:child_process'
import { ListPostsUsecase } from './list-posts.usecase'
import { PostRepository } from '@/post/repositories/post.repository'
import { PostDataBuilder } from '@/post/helpers/post-data-builder'
import { UserDataBuilder } from '@/users/helpers/user-data-builder'

describe('ListPostsUsecase Integration Tests', () => {
  let module: TestingModule
  let repository: PostRepository
  let usecase: ListPostsUsecase
  const prisma = new PrismaClient()

  beforeAll(async () => {
    execSync('npm run prisma:migratetest')
    await prisma.$connect()
    module = await Test.createTestingModule({}).compile()
    repository = new PostRepository(prisma as any)
    usecase = new ListPostsUsecase(repository)
  })

  beforeEach(async () => {
    await prisma.post.deleteMany()
  })

  afterAll(async () => {
    await module.close()
  })

  test('should only apply pagination when the parameters are null', async () => {

    const userData = UserDataBuilder({})
    const user = await prisma.user.create({ data: userData })

    const createdAt = new Date()
    const data = []
    const arrange = Array.from({ length: 3 }, () => PostDataBuilder({}));

    arrange.forEach((element, index) => {
      const timestamp = createdAt.getTime() + index
      data.push({
        ...element,
        content: `${index} content`,
        createdAt: new Date(timestamp),
        userId : user.id
      })
    })

    await prisma.post.createMany({ data })
    const result = await usecase.execute({})

    expect(result).toMatchObject({
      items: data.reverse(),
      total: 3,
      currentPage: 1,
      perPage: 15,
      lastPage: 1,
    })
  })

  test('should apply pagination, filter and ordering', async () => {
    const userData = UserDataBuilder({})
    const user = await prisma.user.create({ data: userData })

    const createdAt = new Date()
    const data = []
    const arrange = ['test a', 'a', 'outro 2 ', 'b', 'test b']

    arrange.forEach((element, index) => {
      const timestamp = createdAt.getTime() + index
      const postDataBuilder = PostDataBuilder({ title: element });
      data.push({
        ...postDataBuilder,
        userId : user.id,
        createdAt: new Date(timestamp),
      })
    })

    await prisma.post.createMany({ data })
    const result1 = await usecase.execute({
      page: 1,
      perPage: 2,
      sort: 'title',
      sortDir: 'asc',
      filter: 'TEst',
    })


    expect(result1).toMatchObject({
      items: [data[0], data[4]],
      total: 2,
      currentPage: 1,
      perPage: 2,
      lastPage: 1,
    })

    const result2 = await usecase.execute({
      page: 1,
      perPage: 1,
      sort: 'title',
      sortDir: 'desc',
      filter: 'TEST',
    })

    expect(result2).toMatchObject({
      items: [data[4]],
      total: 2,
      currentPage: 1,
      perPage: 1,
      lastPage: 2,
    })
  })
})
