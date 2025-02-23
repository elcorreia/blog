import { Test, TestingModule } from '@nestjs/testing';
import { PostResolver } from './post.resolver';
import { CreatePostUseCase } from '../usecases/create-post.usecase';
import { UpdatePostUseCase } from '../usecases/update-post.usecase';
import { ListPostsUsecase } from '../usecases/list-posts.usecase';
import { GetPostUsecase } from '../usecases/get-post.usecase';
import { PostRepository } from '../repositories/post.repository';

describe('PostResolver', () => {
  let resolver: PostResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostResolver,
        CreatePostUseCase,
        UpdatePostUseCase,
        ListPostsUsecase,
        GetPostUsecase,
        {
          provide: PostRepository,
          useValue: {
            create: jest.fn(),
            update: jest.fn(),
            findBySlug: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<PostResolver>(PostResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
