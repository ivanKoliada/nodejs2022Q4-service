import { Injectable } from '@nestjs/common';
import { AlbumEntity } from 'src/albums/albums.entity';
import { ArtistEntity } from 'src/artists/artists.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { TrackEntity } from 'src/tracks/tracks.entity';

@Injectable()
export class BasicService {
  constructor(private prisma: PrismaService) {}

  async getAll(
    field: string,
  ): Promise<ArtistEntity[] | AlbumEntity[] | TrackEntity[]> {
    return await this.prisma[field].findMany();
  }

  async getById(
    id: string,
    field: string,
  ): Promise<ArtistEntity | AlbumEntity | TrackEntity> {
    return await this.prisma[field].findUnique({
      where: {
        id,
      },
    });
  }

  async create(
    data,
    field: string,
  ): Promise<ArtistEntity | AlbumEntity | TrackEntity> {
    return await this.prisma[field].create({
      data,
    });
  }

  async update(id: string, data, field: string): Promise<ArtistEntity> {
    return await this.prisma[field].update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string, field: string) {
    return await this.prisma[field].delete({
      where: {
        id,
      },
    });
  }
}
