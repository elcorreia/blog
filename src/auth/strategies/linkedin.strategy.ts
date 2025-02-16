import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-linkedin-oauth2';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LinkedInStrategy extends PassportStrategy(Strategy, 'linkedin') {
  constructor() {
    super({
      clientID: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      callbackURL: `${process.env.CALLBACK_BASE_URL}/linkedin/callback`,
      scope: ['r_emailaddress', 'r_liteprofile'],
      state: true,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: Function,
  ) {
    const { id, emails, displayName } = profile;
    const user = {
      provider: 'linkedin',
      providerId: id,
      email: emails?.[0]?.value,
      name: displayName,
    };
    return done(null, user);
  }
}
