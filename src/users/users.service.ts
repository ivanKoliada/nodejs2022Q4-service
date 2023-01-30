import { Injectable } from '@nestjs/common';
import { db } from 'src/repository';
import { CreateUserDto, UpdatePasswordDto } from './users.dto';
import { UserEntity } from './users.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {
  async getUsers(): Promise<Omit<UserEntity, 'password'>[]> {
    return await db.users;
  }

  async getUser(id: string): Promise<Omit<UserEntity, 'password'>> {
    const user = await db.users.find((user) => user.id === id);

    return user;
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

    return newUser;
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

      return updatedUser;
    }

    return;
  }

  async deleteUser(id: string) {
    db.users = db.users.filter((user) => user.id !== id);

    return;
  }
}
