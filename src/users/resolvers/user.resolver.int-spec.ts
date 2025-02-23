import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from '@/users/resolvers/user.resolver';
import { UserRepository } from '@/users/repositories/user.repository';
import { UpdateUserUseCase } from '@/users/usecases/update-user.usecase';
import { GetUserUsecase } from '@/users/usecases/get-user.usecase';

describe('UserResolver', () => {
  let resolver: UserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        UpdateUserUseCase,
        GetUserUsecase,
        {
          provide: UserRepository,
          useValue: {
            findById: jest.fn(), // Adicione mocks conforme necessário
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
