import { Injectable } from '@nestjs/common';
import { PrismaService } from "@/database/prisma/prisma.service";
import { User } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByProviderId(provider: string, providerId: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        provider_providerId: {
          provider,
          providerId,
        },
      },
    });
  }

  async createUser(
    provider: string,
    providerId: string,
    email?: string,
    name?: string,
  ): Promise<User> {
    return this.prisma.user.create({
      data: {
        provider,
        providerId,
        email,
        name,
      },
    });
  }
}
