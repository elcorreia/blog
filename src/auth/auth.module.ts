import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

// GraphQL
import { AuthResolver } from './graphql/resolvers/auth.resolver';

// Strategies
import { FacebookStrategy } from './strategies/facebook.strategy';
import { InstagramStrategy } from './strategies/instagram.strategy';
import { TwitterStrategy } from './strategies/twitter.strategy';
import { LinkedInStrategy } from './strategies/linkedin.strategy';

// UseCases
import { OAuthUseCase } from './usecases/oauth.usecase';

// Repository
import { UserRepository } from './repositories/user.repository';

// Controller
import { AuthController } from './auth.controller';
import { DatabaseModule } from '@/database/database.module'

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ session: false }),
    // session: false pois normalmente iremos usar JWT ou só OAuth
  ],
  controllers: [AuthController],
  providers: [
    AuthResolver,
    UserRepository,
    OAuthUseCase,
    FacebookStrategy,
    // InstagramStrategy,
    // TwitterStrategy,
    // LinkedInStrategy,
  ],
})
export class AuthModule {}
