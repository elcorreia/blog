import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-twitter';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {
  constructor() {
    super({
      consumerKey: process.env.TWITTER_CLIENT_ID,
      consumerSecret: process.env.TWITTER_CLIENT_SECRET,
      callbackURL: `${process.env.CALLBACK_BASE_URL}/twitter/callback`,
      includeEmail: true, // Se quiser tentar obter email
    });
  }

  async validate(
    token: string,
    tokenSecret: string,
    profile: any,
    done: Function,
  ) {
    const { id, emails, username, displayName } = profile;
    const user = {
      provider: 'twitter',
      providerId: id,
      email: emails?.[0]?.value,
      name: displayName || username,
    };
    return done(null, user);
  }
}
