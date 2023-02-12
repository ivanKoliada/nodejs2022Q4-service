import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { MSG } from 'src/shared/constants';
import { Public } from 'src/shared/decorators';
import { UserEntity } from 'src/users/users.entity';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  async signUp(@Body() authDto: AuthDto) {
    const user = (await this.authService.signUp(
      authDto,
    )) as unknown as UserEntity;

    return new UserEntity(user);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() authDto: AuthDto) {
    const tokens = await this.authService.login(authDto);

    if (tokens) return tokens;

    throw new HttpException(MSG.ACCESS_DENIED, HttpStatus.FORBIDDEN);
  }
}
