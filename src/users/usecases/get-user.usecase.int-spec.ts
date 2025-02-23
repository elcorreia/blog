import { Test, TestingModule } from '@nestjs/testing'
import { PrismaClient } from '@prisma/client'
import { execSync } from 'node:child_process'
import { NotFoundError } from '@/shared/erros/not-found-error'
import { GetUserUsecase } from './get-user.usecase'
import { UserDataBuilder } from '@/users/helpers/user-data-builder'
import { UserRepository } from '@/users/repositories/user.repository'

describe('GetUserUsecase Integration Tests', () => {
  let module: TestingModule
  let repository: UserRepository
  let usecase: GetUserUsecase
  const prisma = new PrismaClient()

  beforeAll(async () => {
    execSync('npm run prisma:migratetest')
    await prisma.$connect()
    module = await Test.createTestingModule({}).compile()
    repository = new UserRepository(prisma as any)
    usecase = new GetUserUsecase(repository)
  })

  beforeEach(async () => {
    await prisma.post.deleteMany()
  })

  afterAll(async () => {
    await module.close()
  })

  test('should throws an error when the id is not found', async () => {
    await expect(() =>
      usecase.execute('796c5a25-1d3b-4228-9a75-06f416c6e218' ),
    ).rejects.toBeInstanceOf(NotFoundError)
  })

  test('should be able to get user by id', async () => {

    const userData = UserDataBuilder({})

    const user = await prisma.user.create({ data: userData })

    const result = await usecase.execute(user.id)
    expect(result).toStrictEqual(user)
  })
})
