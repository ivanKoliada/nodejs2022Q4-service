import { Body, Controller, Post } from '@nestjs/common';
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
}
