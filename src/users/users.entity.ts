import { Exclude, Transform, Type } from 'class-transformer';

export class UserEntity {
  id: string;
  login: string;

  @Exclude()
  password: string;

  version: number;

  @Type(() => Date)
  // @Transform(({ value }) => new Date(value).toString())
  createdAt: number;

  @Type(() => Date)
  // @Transform(({ value }) => new Date(value).toString())
  updatedAt: number;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
