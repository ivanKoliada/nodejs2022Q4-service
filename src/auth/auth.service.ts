import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpDto, LoginDto, RefreshDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { PayloadEntity, TokenEntity } from './auth.entity';
import { UserEntity } from 'src/users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<UserEntity> {
    const saltRounds = +process.env.CRYPT_SALT;
    const hashedPassword = await hash(signUpDto.password, saltRounds);

    return await this.prisma.user.create({
      data: { ...signUpDto, password: hashedPassword },
    });
  }

  async login({ login, password }: LoginDto): Promise<TokenEntity | undefined> {
    const user = await this.prisma.user.findFirst({
      where: {
        login,
      },
    });

    const isPasswordCorrect = await compare(password, user.password);

    if (user && isPasswordCorrect) {
      const payload = { login: user.login, sub: user.id };

      return await this.generateTokens(payload);
    }

    return;
  }

  async refreshToken({
    refreshToken,
  }: RefreshDto): Promise<TokenEntity | undefined> {
    try {
      const { login, sub } = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });

      return await this.generateTokens({ login, sub });
    } catch (error) {
      return;
    }
  }

  async generateTokens(payload: PayloadEntity): Promise<TokenEntity> {
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
}
