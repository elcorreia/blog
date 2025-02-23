import { UserRepository } from '@/users/repositories/user.repository'
import { UserOutput } from '@/users/dto/user-output.dto'
import { Injectable } from '@nestjs/common'

@Injectable()
export class GetUserUsecase {
    constructor(private userRepository: UserRepository) {}

    async execute(userId: string): Promise<UserOutput> {
      const user = await this.userRepository.findById(userId)
      return user
    }
}
