import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class SignTokenUseCase {
  constructor(private readonly jwtService: JwtService) {}

  execute(user: User): string {
    // Montamos o payload. Você pode adicionar mais campos conforme necessidade
    const payload = {
      sub: user.id,
      email: user.email,
      provider: user.provider,
    };

    // Assinamos o token
    return this.jwtService.sign(payload);
  }
}
