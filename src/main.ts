import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { GqlAuthGuard } from '@/auth/guards/gql-auth.guard'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      errorHttpStatusCode: 422,
    }),
  )

  // Aplica autenticação JWT globalmente (todas as queries e mutations protegidas)
  app.useGlobalGuards(new GqlAuthGuard());

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
