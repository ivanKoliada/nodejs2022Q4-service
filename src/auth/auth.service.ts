import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { AuthDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService, // private readonly userService: UsersService,
  ) {}

  async signUp(authDto: AuthDto) {
    return await this.prisma.user.create({
      data: authDto,
    });
  }
}
