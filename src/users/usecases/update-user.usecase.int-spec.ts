import { Test, TestingModule } from '@nestjs/testing'
import { PrismaClient } from '@prisma/client'
import { execSync } from 'node:child_process'
import { NotFoundError } from '@/shared/erros/not-found-error'
import { UserDataBuilder } from '@/users/helpers/user-data-builder'
import { UserRepository } from '@/users/repositories/user.repository'
import { UpdateUserUseCase } from '@/users/usecases/update-user.usecase'
import { faker } from '@faker-js/faker'
describe('UpdateUserUsecase Integration Tests', () => {
  let module: TestingModule
  let repository: UserRepository
  let usecase: UpdateUserUseCase
  const prisma = new PrismaClient()
  beforeAll(async () => {
    execSync('npm run prisma:migratetest')
    await prisma.$connect()
    module = await Test.createTestingModule({}).compile()
    repository = new UserRepository(prisma as any)
    usecase = new UpdateUserUseCase(repository)
  })
  beforeEach(async () => {
    await prisma.user.deleteMany()
  })

  afterAll(async () => {
    await module.close()
  })

  test('should throws an error when the id is not exist', async () => {

    const data = UserDataBuilder({})

    const userData = {
      ...data,
        id : '796c5a25-1d3b-4228-9a75-06f416c6e218'
    }

    await expect(() => usecase.execute(userData)).rejects.toBeInstanceOf(
      NotFoundError,
    )
  })

  test('should be able to update user', async () => {

    const userData = UserDataBuilder({})
    const user = await prisma.user.create({ data: userData })

    const email = faker.internet.email();
    const username = faker.internet.email();

    const result = await usecase.execute({
      ...user,
      username,
      email,
    })

    expect(result.username).toEqual(username)
    expect(result.email).toEqual(email)
  })
})
