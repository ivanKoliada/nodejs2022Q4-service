import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from './users.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUsers(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async getUser(id: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({
      data: createUserDto,
    });
  }

  async updateUser(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    const user = await this.getUser(id);

    if (user && user.password === updatePasswordDto.oldPassword) {
      return await this.prisma.user.update({
        data: {
          password: updatePasswordDto.newPassword,
          version: user.version + 1,
        },
        where: {
          id,
        },
      });
    }

    return;
  }

  async deleteUser(id: string) {
    return await this.prisma.user.delete({
      where: { id },
    });
  }
}
