import { Module } from '@nestjs/common';
import { PostResolver } from './resolvers/post.resolver';
import { PostRepository } from './repositories/post.repository';
import { PrismaService } from "@/database/prisma/prisma.service";
import { CreatePostUseCase } from './usecases/create-post.usecase';
import { UpdatePostUseCase } from './usecases/update-post.usecase';
import { ListPostsUsecase } from '@/post/usecases/list-posts.usecase'
import { DeletePostUsecase } from '@/post/usecases/delete-post.usecase'
import { GetPostUsecase } from '@/post/usecases/get-post.usecase'

@Module({
  providers: [
    PrismaService,
    PostResolver,
    PostRepository,
    CreatePostUseCase,
    UpdatePostUseCase,
    ListPostsUsecase,
    DeletePostUsecase,
    GetPostUsecase
  ],
})
export class PostModule {}
