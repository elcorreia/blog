import { Injectable } from '@nestjs/common';
import { PrismaService } from "@/database/prisma/prisma.service";
import { User, UserAccount } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByProviderId(provider: string, providerId: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        accounts: {
          some: {
            provider,
            providerId,
          },
        },
      },
    });
  }

  async findAccountByProvider(provider: string, providerId: string):Promise<(UserAccount & { user: User }) | null> {
    return this.prisma.userAccount.findUnique({
      where: {
        provider_providerId: { provider, providerId },
      },
      include: { user: true },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async createUser(email?: string, name?: string): Promise<User> {
    return this.prisma.user.create({
      data: {
        email,
        name,
      },
    });
  }

  async createUserAccount(userId: string, provider: string, providerId: string): Promise<UserAccount> {
    return this.prisma.userAccount.create({
      data: {
        userId,
        provider,
        providerId,
      },
    });
  }
}
