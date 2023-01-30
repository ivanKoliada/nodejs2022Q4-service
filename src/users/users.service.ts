import { Injectable } from '@nestjs/common';
import { db } from 'src/repository';
import { CreateUserDto, UpdatePasswordDto } from './users.dto';
import { UserEntity } from './users.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {
  async getUsers(): Promise<Omit<UserEntity, 'password'>[]> {
    const users = await db.users;

    return users.map((user) => {
      const { password, ...rest } = user;

      return rest;
    });
  }

  async getUser(id: string): Promise<Omit<UserEntity, 'password'>> {
    const user = await db.users.find((user) => user.id === id);
    const { password, ...rest } = user;

    return rest;
  }

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<Omit<UserEntity, 'password'>> {
    const newUser = {
      id: uuid(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      ...createUserDto,
    };

    db.users = [...db.users, newUser];

    const { password, ...rest } = newUser;

    return rest;
  }

  async updateUser(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<Omit<UserEntity, 'password'>> {
    const user = await db.users.find((user) => user.id === id);

    const userIndex = db.users.findIndex((user) => user.id);

    if (user && user.password === updatePasswordDto.oldPassword) {
      const updatedUser = {
        ...user,
        version: user.version++,
        updatedAt: Date.now(),
        password: updatePasswordDto.newPassword,
      };

      db.users[userIndex] = updatedUser;

      const { password, ...rest } = updatedUser;

      return rest;
    }

    return;
  }

  async deleteUser(id: string) {
    db.users = db.users.filter((user) => user.id !== id);

    return;
  }
}
