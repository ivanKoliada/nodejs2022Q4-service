import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { MSG } from 'src/shared/constants';
import { UserEntity } from 'src/users/users.entity';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() authDto: AuthDto) {
    const user = (await this.authService.signUp(
      authDto,
    )) as unknown as UserEntity;

    return new UserEntity(user);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() authDto: AuthDto) {
    const access_token = await this.authService.login(authDto);

    if (access_token) return access_token;

    throw new HttpException(MSG.ACCESS_DENIED, HttpStatus.FORBIDDEN);
  }
}
