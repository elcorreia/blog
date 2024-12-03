import { Module } from '@nestjs/common';
import { AuthorsResolver } from './graphql/resolvers/authors.resolver';
import { DatabaseModule } from '@/database/database.module';
import { PrismaService } from '@/database/prisma/prisma.service';
import { AuthorPrismaRepository } from './repositories/authors-prisma.repository';

@Module({
  imports: [DatabaseModule],
  providers: [
    AuthorsResolver,
    {
      provide : 'PrismaService',
      useClass: PrismaService
    },
    {
      provide: 'AuthorRespository',
      useFactory: (prisma: PrismaService) => {
        return new AuthorPrismaRepository(prisma)
      },
      inject : ['PrismaService']
    }
  ]
})
export class AuthorsModule {}
