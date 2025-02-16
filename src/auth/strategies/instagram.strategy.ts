import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-instagram';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InstagramStrategy extends PassportStrategy(Strategy, 'instagram') {
  constructor() {
    super({
      clientID: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
      callbackURL: `${process.env.CALLBACK_BASE_URL}/instagram/callback`,
      scope: ['user_profile', 'user_media'], // Ajuste escopos necessários
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: Function,
  ) {
    const { id, username, displayName } = profile;
    const user = {
      provider: 'instagram',
      providerId: id,
      name: displayName || username,
      // Instagram não retorna email pelo escopo básico
    };
    return done(null, user);
  }
}
