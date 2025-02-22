import { Test, TestingModule } from '@nestjs/testing'
import { PrismaClient } from '@prisma/client'
import { execSync } from 'node:child_process'
import { NotFoundError } from '@/shared/erros/not-found-error'
import { CreatePostUseCase } from './create-post.usecase'
import { ConflictError } from '@/shared/erros/conflict-error'
import { BadRequestError } from '@/shared/erros/bad-request-error'
import { PostRepository } from '@/post/repositories/post.repository'
import { PostDataBuilder } from '@/post/helpers/post-data-builder'
import { UserDataBuilder } from '@/users/helpers/user-data-builder'

describe('CreatePostUsecase Integration Tests', () => {
  let module: TestingModule
  let repository: PostRepository
  let usecase: CreatePostUseCase
  const prisma = new PrismaClient()

  beforeAll(async () => {
    execSync('npm run prisma:migratetest')
    await prisma.$connect()
    module = await Test.createTestingModule({}).compile()
    repository = new PostRepository(prisma as any)
    usecase = new CreatePostUseCase(repository)
  })

  beforeEach(async () => {
    await prisma.post.deleteMany()
  })

  afterAll(async () => {
    await module.close()
  })


  test('should create a post', async () => {

    const data = PostDataBuilder({})
    const userData = UserDataBuilder({})

    const user = await prisma.user.create({ data: userData })
    const post = await usecase.execute(user.id, data)

    const dataUpdated = {
        ...data,
        createdAt : post.createdAt,
        updatedAt : post.updatedAt
    }

    expect(post.id).toBeDefined()
    expect(post.createdAt).toBeInstanceOf(Date)
    expect(post).toMatchObject(dataUpdated)
  })

  test('should not be able to create with same slug twice', async () => {
    const data = PostDataBuilder({})
    const userData = UserDataBuilder({})

    const user = await prisma.user.create({ data: userData })
    const post = await usecase.execute(user.id, data)

    await expect(() => usecase.execute(user.id, data)).rejects.toBeInstanceOf(
      ConflictError,
    )
  })
})
