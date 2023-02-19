import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FavoritesEntity } from './favorites.entity';
import { NIL } from 'uuid';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async getFavorites(): Promise<FavoritesEntity> {
    const favorites = await this.prisma.favorites.findUnique({
      where: { id: NIL },
      select: {
        tracks: {
          select: {
            id: true,
            name: true,
            artistId: true,
            albumId: true,
            duration: true,
          },
        },
        artists: {
          select: {
            id: true,
            name: true,
            grammy: true,
          },
        },
        albums: {
          select: {
            id: true,
            name: true,
            year: true,
            artistId: true,
          },
        },
      },
    });

    if (!favorites) {
      return await this.prisma.favorites.create({
        data: {
          id: NIL,
        },
        select: {
          tracks: {
            select: {
              id: true,
              name: true,
              artistId: true,
              albumId: true,
              duration: true,
            },
          },
          artists: {
            select: {
              id: true,
              name: true,
              grammy: true,
            },
          },
          albums: {
            select: {
              id: true,
              name: true,
              year: true,
              artistId: true,
            },
          },
        },
      });
    }

    return favorites;
  }

  async addToFavorites(id: string, field: string) {
    try {
      return await this.prisma[field].update({
        where: {
          id: id,
        },
        data: {
          favoritesId: NIL,
        },
      });
    } catch (error) {
      return;
    }
  }

  async deleteFromFavorites(id: string, field: string) {
    try {
      return await this.prisma[field].update({
        where: {
          id: id,
        },
        data: {
          favoritesId: null,
        },
      });
    } catch (error) {
      return;
    }
  }
}
