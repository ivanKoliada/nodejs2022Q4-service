import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { MSG } from 'src/constants';
import { CreateUserDto, UpdatePasswordDto } from './users.dto';
import { UserEntity } from './users.entity';
import { UsersService } from './users.service';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers() {
    const users = await this.usersService.getUsers();

    return users.map((user) => new UserEntity(user));
  }

  @Get(':id')
  async getUser(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    const user = await this.usersService.getUser(id);

    if (user) return new UserEntity(user);

    throw new HttpException(MSG.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.createUser(createUserDto);

    return new UserEntity(user);
  }

  @Put(':id')
  async updateUser(
    @Param('id', new ParseUUIDPipe())
    id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const user = await this.usersService.getUser(id);

    if (!user) {
      throw new HttpException(MSG.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const updatedUser = await this.usersService.updateUser(
      id,
      updatePasswordDto,
    );

    if (!updatedUser) {
      throw new HttpException(MSG.WRONG_PASSWORD, HttpStatus.FORBIDDEN);
    }

    return new UserEntity(updatedUser);
  }

  @Delete(':id')
  async deleteUser(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    const user = await this.usersService.getUser(id);

    if (!user) {
      throw new HttpException(MSG.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    await this.usersService.deleteUser(id);

    throw new HttpException(MSG.NO_CONTENT, HttpStatus.NO_CONTENT);
  }
}
