import { Injectable } from '@nestjs/common';
import { db } from 'src/repository';
import { CreateArtistDto, UpdateArtistDto } from './artists.dto';
import { ArtistEntity } from './artists.entity';
import { v4 as uuid } from 'uuid';
import { DB_FIELD } from 'src/shared/constants';
import { PrismaService } from 'src/prisma/prisma.service';
import { BasicService } from 'src/basic/basic.service';

@Injectable()
export class ArtistsService extends BasicService {
  // constructor(private prisma: PrismaService) {}
  // async getAll(): Promise<ArtistEntity[]> {
  //   return await this.prisma.artist.findMany();
  // }
  // async getById(id: string): Promise<ArtistEntity> {
  //   return await this.prisma.artist.findUnique({
  //     where: { id },
  //   });
  // }
  // async createArtist(createArtistDto): Promise<ArtistEntity> {
  //   return await this.prisma.artist.create({
  //     data: createArtistDto,
  //   });
  // }
  // async updateArtist(
  //   id: string,
  //   updateArtistDto: UpdateArtistDto,
  // ): Promise<ArtistEntity> {
  //   return await this.prisma.artist.update({
  //     where: {
  //       id,
  //     },
  //     data: updateArtistDto,
  //   });
  // }
  // async deleteArtist(id: string): Promise<ArtistEntity> {
  //   return await this.prisma.artist.delete({
  //     where: { id },
  //   });
  // }
}
