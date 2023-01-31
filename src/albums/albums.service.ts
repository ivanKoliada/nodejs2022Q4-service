import { Injectable } from '@nestjs/common';
import { db } from 'src/repository';
import { AlbumEntity } from './albums.entity';
import { v4 as uuid } from 'uuid';
import { CreateAlbumDto, UpdateAlbumDto } from './albums.dto';
import { BasicService } from 'src/shared/basicService';
import { DB_FIELD } from 'src/shared/constants';

@Injectable()
export class AlbumsService extends BasicService {
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
    const album = await this.findOne(id, DB_FIELD.ALBUMS);
    const albumIndex = db.albums.findIndex((album) => album.id);

    const updatedAlbum = {
      ...album,
      ...updateAlbumDto,
    };

    db.albums[albumIndex] = updatedAlbum;

    return updatedAlbum;
  }

  async delete(id: string, field: string) {
    db.tracks.forEach((track) =>
      track.albumId === id ? (track.albumId = null) : track.albumId,
    );

    db.favorites.albums = db.favorites.albums.filter(
      (albumId) => albumId !== id,
    );

    super.delete(id, field);
  }
}
