import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    super({
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: `${process.env.CALLBACK_BASE_URL}/facebook/callback`,
      profileFields: ['id', 'emails', 'name'], // Ajuste conforme necessidade
      scope: ['email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: Function,
  ) {
    const { id, emails, name } = profile;
    // Monta objeto comum
    const user = {
      provider: 'facebook',
      providerId: id,
      email: emails?.[0]?.value,
      name: `${name?.givenName || ''} ${name?.familyName || ''}`.trim(),
    };
    return done(null, user);
  }
}
