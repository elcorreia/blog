import { Test, TestingModule } from '@nestjs/testing'
import { PrismaClient } from '@prisma/client'
import { execSync } from 'node:child_process'
import { NotFoundError } from '@/shared/erros/not-found-error'
import { PostRepository } from './post.repository'
import { PostDataBuilder } from '../helpers/post-data-builder'
import { UserDataBuilder } from '@/users/helpers/user-data-builder'
import slugify from 'slugify'
import { faker } from '@faker-js/faker'

describe('PostRepository Integration Tests', () => {
  let module: TestingModule
  let repository: PostRepository
  const prisma = new PrismaClient()

  beforeAll(async () => {
    execSync('npm run prisma:migratetest')
    await prisma.$connect()
    module = await Test.createTestingModule({}).compile()
    repository = new PostRepository(prisma as any)
  })

  beforeEach(async () => {
    await prisma.post.deleteMany()
    await prisma.user.deleteMany()
  })

  afterAll(async () => {
    await module.close()
  })

  test('should throws an error when the id is not found', async () => {
    await expect(
      repository.findById('796c5a25-1d3b-4228-9a75-06f416c6e218'),
    ).rejects.toThrow(
      new NotFoundError(
        'Post not found using ID 796c5a25-1d3b-4228-9a75-06f416c6e218',
      ),
    )
  })

  test('should find a post by id', async () => {
    const postData = PostDataBuilder({})
    const userData = UserDataBuilder({})
    const user = await prisma.user.create({ data: userData })

    const post = await prisma.post.create({
      data: {
        ...postData,
        slug: slugify(postData.title),
        user: {
          connect: { ...user },
        },
      },
    })

    const result = await repository.findById(post.id)
    expect(result).toStrictEqual(post)
  })

  test('should create a post', async () => {
    const postData = PostDataBuilder({})
    const userData = UserDataBuilder({})
    const user = await prisma.user.create({ data: userData })

    const postDataWithSlug = {
      ...postData,
      slug: slugify(postData.title, { lower: true }),
      userId: user.id
    };

    const result = await repository.create(postDataWithSlug)
    expect(result).toMatchObject(postDataWithSlug)
  })

  test('should throws an error when updating a post not found', async () => {
    const data = PostDataBuilder({})
    const post = {
      ...data,
      id: '796c5a25-1d3b-4228-9a75-06f416c6e218',
      userId: '796c5a25-1d3b-4228-9a75-06f416c6e218',
    }
    await expect(repository.update(post)).rejects.toThrow(
      new NotFoundError(
        'Post not found using ID 796c5a25-1d3b-4228-9a75-06f416c6e218',
      ),
    )
  })

  test('should update a post', async () => {
    const postData = PostDataBuilder({})
    const userData = UserDataBuilder({})
    const user = await prisma.user.create({ data: userData })

    const postDataWithSlug = {
      ...postData,
      slug: slugify(postData.title, { lower: true }),
      userId: user.id,
      published : false
    };

    const post = await repository.create(postDataWithSlug)

    const content = faker.lorem.paragraphs(8)

    const updatedPost = {
      ...post,
      published: true,
      content
    }
    const result = await repository.update(updatedPost)

    expect(result.published).toEqual(true)
    expect(result.content).toEqual(content)
  })

  test('should return null when it does not find an post with the slug provided', async () => {
    const result = await repository.findBySlug('fake-slug-data')
    expect(result).toBeNull()
  })

  test('should find a post by slug', async () => {
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

    const result = await repository.findBySlug(post.slug)
    expect(result).toStrictEqual(post)
  })

})
