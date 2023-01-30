import { Injectable } from '@nestjs/common';
import { db } from 'src/repository';
import { AlbumEntity } from './albums.entity';
import { v4 as uuid } from 'uuid';
import { CreateAlbumDto, UpdateAlbumDto } from './albums.dto';
import { tracksRoutes } from 'test/endpoints';

@Injectable()
export class AlbumsService {
  async getAlbums(): Promise<AlbumEntity[]> {
    return await db.albums;
  }

  async getAlbum(id: string): Promise<AlbumEntity> {
    const album = await db.albums.find((album) => album.id === id);

    return album;
  }

  async createAlbum(createAlbumDto: CreateAlbumDto): Promise<AlbumEntity> {
    const newAlbum = {
      id: uuid(),
      artistId: null,
      ...createAlbumDto,
    };

    db.albums = [...db.albums, newAlbum];

    return newAlbum;
  }

  async updateAlbum(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumEntity> {
    const album = await this.getAlbum(id);
    const albumIndex = db.albums.findIndex((album) => album.id);

    const updatedAlbum = {
      ...album,
      ...updateAlbumDto,
    };

    db.albums[albumIndex] = updatedAlbum;

    return updatedAlbum;
  }

  async deleteAlbum(id: string) {
    db.albums = db.albums.filter((album) => album.id !== id);

    db.tracks = db.tracks.map((track) => {
      return {
        ...track,
        albumId: track.albumId === id ? null : track.albumId,
      };
    });
    // track.albumId === id ? (track.albumId = null) : track.albumId,

    db.favorites.albums = db.favorites.albums.filter(
      (album) => album.id !== id,
    );

    return;
  }
}
