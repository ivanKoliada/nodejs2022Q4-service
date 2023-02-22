import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from './users.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from './users.entity';
import { compare, hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUsers(): Promise<UserEntity[]> {
    return await this.prisma.user.findMany();
  }

  async getUser(id: string): Promise<UserEntity> {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async createUser({ login, password }: CreateUserDto): Promise<UserEntity> {
    const saltRounds = +process.env.CRYPT_SALT;
    const hashedPassword = await hash(password, saltRounds);

    return await this.prisma.user.create({
      data: { login, password: hashedPassword },
    });
  }

  async updateUser(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserEntity> {
    const user = await this.getUser(id);

    const isPasswordCorrect = await compare(
      updatePasswordDto.oldPassword,
      user.password,
    );

    if (user && isPasswordCorrect) {
      const saltRounds = +process.env.CRYPT_SALT;
      const hashedPassword = await hash(
        updatePasswordDto.newPassword,
        saltRounds,
      );

      return await this.prisma.user.update({
        data: {
          password: hashedPassword,
          version: user.version + 1,
        },
        where: {
          id,
        },
      });
    }
  }

  async deleteUser(id: string) {
    return await this.prisma.user.delete({
      where: { id },
    });
  }
}
