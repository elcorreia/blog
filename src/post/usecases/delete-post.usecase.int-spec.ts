import { Test, TestingModule } from '@nestjs/testing'
import { PrismaClient } from '@prisma/client'
import { execSync } from 'node:child_process'
import { NotFoundError } from '@/shared/erros/not-found-error'
import { DeletePostUsecase } from './delete-post.usecase'
import { PostRepository } from '@/post/repositories/post.repository'
import { PostDataBuilder } from '@/post/helpers/post-data-builder'
import { UserDataBuilder } from '@/users/helpers/user-data-builder'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

describe('DeletePostUsecase Integration Tests', () => {
  let module: TestingModule
  let repository: PostRepository
  let usecase: DeletePostUsecase
  const prisma = new PrismaClient()

  beforeAll(async () => {
    execSync('npm run prisma:migratetest')
    await prisma.$connect()
    module = await Test.createTestingModule({}).compile()
    repository = new PostRepository(prisma as any)
    usecase = new DeletePostUsecase(repository)
  })

  beforeEach(async () => {
    await prisma.post.deleteMany()
  })

  afterAll(async () => {
    await module.close()
  })

  test('should throws an error when the id is not found', async () => {
    await expect(() =>
      usecase.execute('796c5a25-1d3b-4228-9a75-06f416c6e218'),
    ).rejects.toBeInstanceOf(PrismaClientKnownRequestError) //todo
  })

  test('should delete a post', async () => {
    const data = PostDataBuilder({})
    const userData = UserDataBuilder({})

    const user = await prisma.user.create({ data: userData })

    const post = await prisma.post.create({
      data: {
        ...data,
        user: { connect: { id: user.id } },
      },
    });

    const result = await usecase.execute(post.id)
    expect(result).toStrictEqual(post)

    const posts = await prisma.post.findMany()
    expect(posts).toHaveLength(0)
  })
})
