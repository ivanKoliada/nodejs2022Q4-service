import { Injectable } from '@nestjs/common';
import { AlbumEntity } from 'src/albums/albums.entity';
import { ArtistEntity } from 'src/artists/artists.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { db } from 'src/repository';
import { TrackEntity } from 'src/tracks/tracks.entity';

@Injectable()
export class BasicService {
  constructor(private prisma: PrismaService) {}
  async findAll(
    field: string,
  ): Promise<ArtistEntity[] | AlbumEntity[] | TrackEntity[]> {
    // return await db[field];
    return await this.prisma[field].findMany();
  }

  async findOne(
    id: string,
    field: string,
  ): Promise<ArtistEntity | AlbumEntity | TrackEntity> {
    // return await db[field].find((item) => item.id === id);
    return await this.prisma[field].findUnique({
      where: {
        id,
      },
    });
  }

  async delete(id: string, field: string) {
    // db[field] = db[field].filter((item) => item.id !== id);

    // return;

    return await this.prisma[field].delete({
      where: {
        id,
      },
    });
  }
}
