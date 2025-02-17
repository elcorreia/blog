import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OAuthUseCase } from './usecases/oauth.usecase';
import { SignTokenUseCase } from '@/auth/usecases/sign-token.usecase'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly oauthUseCase: OAuthUseCase,
    private readonly signTokenUseCase: SignTokenUseCase,
  ) {}

  // ---------------- FACEBOOK ----------------
  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin() {
    // Redireciona para Facebook
  }

  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookCallback(@Req() req: any, @Res() res: any) {
    const { provider, providerId, email, name } = req.user;

    // 1. Cria ou busca usuário no BD
    const user = await this.oauthUseCase.handleOAuthUser(
      provider,
      providerId,
      email,
      name,
    );

    // 2. Assina o token
    const token = this.signTokenUseCase.execute(user);

    // 3. Devolver para o front
    // Exemplo A: Redireciona com token na query (não é o mais seguro, mas útil para teste)
    // return res.redirect(`http://localhost:3000/dashboard?token=${token}`);

    // Exemplo B: Resposta JSON (mais comum para front-end via fetch/axios):
    return res.json({ token, user });
  }

  // ---------------- INSTAGRAM ----------------
  @Get('instagram')
  @UseGuards(AuthGuard('instagram'))
  async instagramLogin() {}

  @Get('instagram/callback')
  @UseGuards(AuthGuard('instagram'))
  async instagramCallback(@Req() req: any, @Res() res: any) {
    const { provider, providerId, email, name } = req.user; // Instagram pode não ter email
    const user = await this.oauthUseCase.handleOAuthUser(provider, providerId, email, name);
    return res.redirect(`http://localhost:3000/dashboard?userId=${user.id}`);
  }

  // ---------------- TWITTER ----------------
  @Get('twitter')
  @UseGuards(AuthGuard('twitter'))
  async twitterLogin() {}

  @Get('twitter/callback')
  @UseGuards(AuthGuard('twitter'))
  async twitterCallback(@Req() req: any, @Res() res: any) {
    const { provider, providerId, email, name } = req.user;
    const user = await this.oauthUseCase.handleOAuthUser(provider, providerId, email, name);
    return res.redirect(`http://localhost:3000/dashboard?userId=${user.id}`);
  }

  // ---------------- LINKEDIN ----------------
  @Get('linkedin')
  @UseGuards(AuthGuard('linkedin'))
  async linkedinLogin() {}

  @Get('linkedin/callback')
  @UseGuards(AuthGuard('linkedin'))
  async linkedinCallback(@Req() req: any, @Res() res: any) {
    const { provider, providerId, email, name } = req.user;
    const user = await this.oauthUseCase.handleOAuthUser(provider, providerId, email, name);
    return res.redirect(`http://localhost:3000/dashboard?userId=${user.id}`);
  }
}
