import { Injectable } from '@nestjs/common';
import { db } from 'src/repository';
import { CreateUserDto, UpdatePasswordDto } from './users.dto';
import { UserEntity } from './users.entity';
import { v4 as uuid } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async getUsers(): Promise<User[]> {
    // return await db.users;
    return await this.prisma.user.findMany();
  }

  async getUser(id): Promise<User> {
    // const user = await db.users.find((user) => user.id === id);

    // return user;
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // const newUser = {
    //   id: uuid(),
    //   version: 1,
    //   createdAt: Date.now(),
    //   updatedAt: Date.now(),
    //   ...createUserDto,
    // };

    // db.users = [...db.users, newUser];

    // return newUser;
    return await this.prisma.user.create({
      data: createUserDto,
    });
  }

  async updateUser(id, updatePasswordDto: UpdatePasswordDto): Promise<User> {
    // const user = await db.users.find((user) => user.id === id);

    // const userIndex = db.users.findIndex((user) => user.id);

    // if (user && user.password === updatePasswordDto.oldPassword) {
    //   const updatedUser = {
    //     ...user,
    //     version: user.version + 1,
    //     updatedAt: Date.now(),
    //     password: updatePasswordDto.newPassword,
    //   };

    //   db.users[userIndex] = updatedUser;

    //   return updatedUser;
    // }

    // return;
    const user = await this.getUser(id);

    if (user && user.password === updatePasswordDto.oldPassword) {
      return await this.prisma.user.update({
        data: {
          password: updatePasswordDto.newPassword,
        },
        where: {
          id,
        },
      });
    }

    return;
  }

  async deleteUser(id) {
    // db.users = db.users.filter((user) => user.id !== id);

    // return;
    return await this.prisma.user.delete({
      where: { id },
    });
  }
}
