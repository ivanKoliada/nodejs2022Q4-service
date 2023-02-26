import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { MSG } from 'src/shared/constants';
import { BodyHasRefreshToken, Public } from 'src/shared/decorators/decorator';
import { UserEntity } from 'src/users/users.entity';
import { SignUpDto, LoginDto, RefreshDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    const user = await this.authService.signUp(signUpDto);

    return new UserEntity(user);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    const tokens = await this.authService.login(loginDto);

    if (tokens) return tokens;

    throw new ForbiddenException(MSG.ACCESS_DENIED);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(
    @BodyHasRefreshToken(
      new ValidationPipe({
        validateCustomDecorators: true,
        errorHttpStatusCode: HttpStatus.UNAUTHORIZED,
        exceptionFactory: () => new UnauthorizedException(MSG.NO_REFRESH_TOKEN),
      }),
    )
    refreshDto: RefreshDto,
  ) {
    const tokens = await this.authService.refreshToken(refreshDto);

    if (tokens) return tokens;

    throw new ForbiddenException(MSG.INVALID_TOKEN);
  }
}
