import { Module } from '@nestjs/common';
import { UserResolver } from './resolvers/user.resolver';
import { UserRepository } from './repositories/user.repository';
import { PrismaService } from "@/database/prisma/prisma.service";
import { UpdateUserUseCase } from './usecases/update-user.usecase';
import { GetUserUsecase } from '@/users/usecases/get-user.usecase'

@Module({
  providers: [
    PrismaService,
    UserResolver,
    UserRepository,
    UpdateUserUseCase,
    GetUserUsecase
  ],
})
export class UsersModule {}
