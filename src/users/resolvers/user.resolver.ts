import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserDTO } from '../dto/user.dto';
import { UpdateUserUseCase } from '../usecases/update-user.usecase';
import { UserRepository } from '../repositories/user.repository';
import { UpdateUserInput } from '@/users/dto/update-user.input'
import { GetUserUsecase } from '@/users/usecases/get-user.usecase'

@Resolver(() => UserDTO)
export class UserResolver {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly getUserUsecase: GetUserUsecase
  ) {}

  @Query(() => UserDTO, { name: 'getUserById', nullable: true })
  async getUserById(@Args('id') id: string) {
    return this.getUserUsecase.execute(id);
  }

  @Mutation(() => UserDTO)
  async updateUser(
    @Args('data') data: UpdateUserInput,
  ) {
    return this.updateUserUseCase.execute(data);
  }
}
