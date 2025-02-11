import { Test, TestingModule } from '@nestjs/testing'
import { AuthorsPrismaRepository } from './authors-prisma.repository'
import { PrismaClient } from '@prisma/client'
import { execSync } from 'node:child_process'
import { NotFoundError } from '@/shared/erros/not-found-error'
import { AuthorDataBuilder } from '../helpers/author-data-builder'

describe('AuthorsPrismaRepository Integrations Tests', () => {
  let module: TestingModule
  let repository: AuthorsPrismaRepository;
  const prisma = new PrismaClient();

  beforeAll(async () => {
    execSync('npm run prisma:migratetest')
    //await prisma.$connect()
    module = await Test.createTestingModule({}).compile()
    repository = new AuthorsPrismaRepository(prisma as any)
  })

  beforeEach(async () => {
    await prisma.author.deleteMany(); // Limpar a tabela antes de cada teste
  });

  afterAll(async () => {
    await prisma.$disconnect(); // Fechar conexão do Prisma
  });

  test('should throws an error when the id is not found', async () => {
    const nonExistentId = '9e7b255d-4ed6-48a2-9b5c-5c9d1dc49ac5';
    await expect(repository.findById(nonExistentId)).rejects.toThrow(
      new NotFoundError(`Author not found using ID ${nonExistentId}`),
    );
  });

  test('should find an author by id', async () => {
    const data = AuthorDataBuilder({})

    const author = await prisma.author.create({
      data,
    })

    const result = await repository.findById(author.id)
    expect(result).toStrictEqual(author)
  })

  test('should create a author', async () => {
    const data = AuthorDataBuilder({})

    const author = await repository.create(data)

    expect(author).toMatchObject(data)
  })

  describe('search method', () => {
    test('should only apply pagination when the parameters are null', async () => {
      const createdAt = new Date()
      const data = []
      const arrange = Array(16).fill(AuthorDataBuilder({}))
      arrange.forEach((element, index) => {
        const timestamp = createdAt.getTime() + index
        data.push({
          ...element,
          email: `author${index}@a.com`,
          createdAt: new Date(timestamp),
        })
      })

      await prisma.author.createMany({ data })
      const result = await repository.search({})

      expect(result.total).toBe(16)
      expect(result.items.length).toBe(15)
      result.items.forEach(item => {
        expect(item.id).toBeDefined()
      })
    })
  })

});
