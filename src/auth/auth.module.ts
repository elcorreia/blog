import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

// GraphQL
import { AuthResolver } from './graphql/resolvers/auth.resolver';

// Guards, Strategies
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { FacebookStrategy } from './strategies/facebook.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
// import { InstagramStrategy } from './strategies/instagram.strategy';
// import { TwitterStrategy } from './strategies/twitter.strategy';
// import { LinkedInStrategy } from './strategies/linkedin.strategy';

// UseCases
import { OAuthUseCase } from './usecases/oauth.usecase';
import { SignTokenUseCase } from './usecases/sign-token.usecase';

// Repository
import { UserRepository } from './repositories/user.repository';

// Controller
import { AuthController } from './auth.controller';
import { DatabaseModule } from '@/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ session: false }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {},
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthResolver,
    UserRepository,
    OAuthUseCase,
    SignTokenUseCase,
    FacebookStrategy,
    // InstagramStrategy,
    // TwitterStrategy,
    // LinkedInStrategy,
    GqlAuthGuard,
    JwtStrategy
  ],
  exports: [GqlAuthGuard],
})
export class AuthModule {}
