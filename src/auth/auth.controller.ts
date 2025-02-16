import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OAuthUseCase } from './usecases/oauth.usecase';

@Controller('auth')
export class AuthController {
  constructor(private readonly oauthUseCase: OAuthUseCase) {}

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
    // Persiste ou recupera usuário
    const user = await this.oauthUseCase.handleOAuthUser(provider, providerId, email, name);

    // Redireciona para a página que você quiser no front
    return res.redirect(`http://localhost:3000/dashboard?userId=${user.id}`);
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
