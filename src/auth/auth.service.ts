import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { AuthDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService, // private readonly userService: UsersService,
  ) {}

  async signUp(authDto: AuthDto): Promise<User> {
    return await this.prisma.user.create({
      data: authDto,
    });
  }

  async login({ login, password }: AuthDto): Promise<string> {
    const user = await this.prisma.user.findFirst({
      where: {
        login,
      },
    });

    if (user && user.password === password) {
      return 'token';
    }

    return;
  }
}
