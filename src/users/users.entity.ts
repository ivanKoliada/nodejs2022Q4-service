import { Exclude, Type } from 'class-transformer';

export class UserEntity {
  id: string;

  login: string;

  @Exclude()
  password: string;

  version: number;

  @Type(() => Number)
  createdAt: number | Date;

  @Type(() => Number)
  updatedAt: number | Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
