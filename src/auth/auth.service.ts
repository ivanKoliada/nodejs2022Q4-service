import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(authDto: AuthDto): Promise<User> {
    const saltRounds = +process.env.CRYPT_SALT;
    const hashedPassword = await hash(authDto.password, saltRounds);

    return await this.prisma.user.create({
      data: { ...authDto, password: hashedPassword },
    });
  }

  async login({ login, password }: AuthDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        login,
      },
    });

    const isPasswordCorrect = await compare(password, user.password);

    if (user && isPasswordCorrect) {
      const payload = { login: user.login, sub: user.id };

      return {
        accessToken: await this.jwtService.signAsync(payload, {
          secret: process.env.JWT_SECRET_KEY,
          expiresIn: process.env.TOKEN_EXPIRE_TIME,
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
          expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
        }),
      };
    }

    return;
  }
}
