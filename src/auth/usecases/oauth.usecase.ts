import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { User } from '@prisma/client';

@Injectable()
export class OAuthUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * Verifica se o usuário já existe pelo providerId.
   * Se não existir, cria um novo.
   * Retorna o objeto do usuário final.
   */
  async handleOAuthUser(
    provider: string,
    providerId: string,
    email?: string,
    name?: string,
  ): Promise<User> {
    const existingUser = await this.userRepository.findByProviderId(provider, providerId);

    if (existingUser) {
      return existingUser;
    }
    const newUser = await this.userRepository.createUser(provider, providerId, email, name);
    return newUser;
  }
}
