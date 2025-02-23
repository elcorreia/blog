import { Injectable } from '@nestjs/common';
import { PrismaService } from "@/database/prisma/prisma.service";
import { Post, User } from '@prisma/client'
import { NotFoundError } from '@/shared/erros/not-found-error'
import { UserDTO } from '@/users/dto/user.dto'

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<User> {
    const user = await this.get(id);
    return user;
  }

  async updateUser(userParam: Partial<UserDTO>): Promise<User> {
    await this.get(userParam.id)

    return this.prisma.user.update({
        data: userParam as any,
        where: {
          id: userParam.id,
        },
      });
  }

  async get(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    })
    if (!user) {
      throw new NotFoundError(`User not found using ID ${id}`)
    }
    return user
  }
}
