import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { UserDTO } from '../dto/user.dto';
import { UpdateUserInput } from '@/users/dto/update-user.input'

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: UpdateUserInput): Promise<UserDTO> {
    const updatedUser = await this.userRepository.updateUser(data);

    return updatedUser
  }
}
