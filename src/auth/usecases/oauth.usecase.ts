import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { User, UserAccount } from '@prisma/client';

@Injectable()
export class OAuthUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * Lida com autenticação OAuth, garantindo que o usuário seja identificado corretamente,
   * independente do provedor utilizado.
   */
  async handleOAuthUser(
    provider: string,
    providerId: string,
    email?: string,
    name?: string,
  ): Promise<User> {
    // 1️⃣ Verifica se já existe uma conta vinculada ao providerId
    let userAccount = await this.userRepository.findAccountByProvider(provider, providerId);

    if (userAccount) {
      return userAccount.user;
    }

    // 2️⃣ Se não existe, verifica se há um usuário com o mesmo email
    let user = email ? await this.userRepository.findByEmail(email) : null;

    if (!user) {
      // 3️⃣ Se não existe um usuário com esse email, cria um novo usuário
      user = await this.userRepository.createUser(email, name);
    }

    // 4️⃣ Vincula o novo provedor ao usuário existente
    await this.userRepository.createUserAccount(user.id, provider, providerId);

    return user;
  }
}
