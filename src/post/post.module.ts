import { Module } from '@nestjs/common';
import { PostResolver } from './resolvers/post.resolver';
import { PostRepository } from './repositories/post.repository';
import { PrismaService } from "@/database/prisma/prisma.service";
import { CreatePostUseCase } from './usecases/create-post.usecase';
import { UpdatePostUseCase } from './usecases/update-post.usecase';

@Module({
  providers: [
    PrismaService,
    PostResolver,
    PostRepository,
    CreatePostUseCase,
    UpdatePostUseCase,
  ],
})
export class PostModule {}
