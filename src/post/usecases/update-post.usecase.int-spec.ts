import { Test, TestingModule } from '@nestjs/testing'
import { PrismaClient } from '@prisma/client'
import { execSync } from 'node:child_process'
import { NotFoundError } from '@/shared/erros/not-found-error'
import { PostRepository } from '@/post/repositories/post.repository'
import { UpdatePostUseCase } from '@/post/usecases/update-post.usecase'
import { PostDataBuilder } from '@/post/helpers/post-data-builder'
import { UserDataBuilder } from '@/users/helpers/user-data-builder'
describe('UpdatePostUsecase Integration Tests', () => {
  let module: TestingModule
  let repository: PostRepository
  let usecase: UpdatePostUseCase
  const prisma = new PrismaClient()
  beforeAll(async () => {
    execSync('npm run prisma:migratetest')
    await prisma.$connect()
    module = await Test.createTestingModule({}).compile()
    repository = new PostRepository(prisma as any)
    usecase = new UpdatePostUseCase(repository)
  })
  beforeEach(async () => {
    await prisma.post.deleteMany()
  })
  afterAll(async () => {
    await module.close()
  })
  test('should throws an error when the id is not provided', async () => {

    const data = PostDataBuilder({})

    const postData = {
      ...data,
        id : '796c5a25-1d3b-4228-9a75-06f416c6e218'
    }

    await expect(() => usecase.execute(postData)).rejects.toBeInstanceOf(
      NotFoundError,
    )
  })

  test('should be able to update author', async () => {
    const postData = PostDataBuilder({})
    const userData = UserDataBuilder({})
    const user = await prisma.user.create({ data: userData })

    const post = await prisma.post.create({
      data: {
        ...postData,
        user: {
          connect: { ...user },
        },
      },
    })

    const result = await usecase.execute({
      ...post,
      title: 'Name updated',
      content: 'lorem ipsum1 3#$%¨&)(__*-+',
    })

    expect(result.title).toEqual('Name updated')
    expect(result.content).toEqual('lorem ipsum1 3#$%¨&)(__*-+')
  })
})
