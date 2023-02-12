import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signUp(authDto: AuthDto): Promise<User> {
    return await this.prisma.user.create({
      data: authDto,
    });
  }

  async login({ login, password }: AuthDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        login,
      },
    });

    if (user && user.password === password) {
      const payload = { username: user.login, sub: user.id };

      return this.jwtService.sign(payload);
    }

    return;
  }
}
