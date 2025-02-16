import { Resolver, Mutation } from '@nestjs/graphql';

@Resolver()
export class AuthResolver {

  @Mutation(() => String)
  async loginFacebook(): Promise<string> {
    // Em um fluxo real, você poderia retornar a URL de login do Facebook,
    // e o front faz redirect para lá.
    return 'URL de login do Facebook (ex: /auth/facebook)';
  }

  // Faça o mesmo para Instagram, Twitter e LinkedIn se necessário
}
