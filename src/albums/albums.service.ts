import { Injectable } from '@nestjs/common';
import { db } from 'src/repository';
import { AlbumEntity } from './albums.entity';
import { v4 as uuid } from 'uuid';
import { CreateAlbumDto, UpdateAlbumDto } from './albums.dto';
import { DB_FIELD } from 'src/shared/constants';
import { PrismaService } from 'src/prisma/prisma.service';
import { BasicService } from 'src/basic/basic.service';

@Injectable()
export class AlbumsService extends BasicService {
  // async getAll(): Promise<AlbumEntity[]> {
  //   return await this.prisma.album.findMany();
  // }
  // async getById(id: string): Promise<AlbumEntity> {
  //   return await this.prisma.album.findUnique({
  //     where: { id },
  //   });
  // }
  // async createAlbum(createAlbumDto: CreateAlbumDto): Promise<AlbumEntity> {
  //   return await this.prisma.album.create({
  //     data: createAlbumDto,
  //   });
  // }
  // async updateAlbum(
  //   id: string,
  //   updateAlbumDto: UpdateAlbumDto,
  // ): Promise<AlbumEntity> {
  //   return await this.prisma.album.update({
  //     where: {
  //       id,
  //     },
  //     data: updateAlbumDto,
  //   });
  // }
  // async deleteAlbum(id: string): Promise<AlbumEntity> {
  //   return await this.prisma.album.delete({
  //     where: { id },
  //   });
  // }
}
