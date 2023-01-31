import { Injectable } from '@nestjs/common';
import { db } from 'src/repository';
import { CreateArtistDto, UpdateArtistDto } from './artists.dto';
import { ArtistEntity } from './artists.entity';
import { v4 as uuid } from 'uuid';
import { BasicService } from 'src/shared/basicService';

@Injectable()
export class ArtistsService extends BasicService {
  async createArtist(createArtistDto: CreateArtistDto): Promise<ArtistEntity> {
    const newArtist = {
      id: uuid(),
      ...createArtistDto,
    };

    db.artists = [...db.artists, newArtist];

    return newArtist;
  }

  async updateArtist(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistEntity> {
    const artist = await this.findOne(id, 'artists');
    const artistIndex = db.artists.findIndex((artist) => artist.id);

    const updatedArtist = {
      ...artist,
      ...updateArtistDto,
    };

    db.artists[artistIndex] = updatedArtist;

    return updatedArtist;
  }

  async delete(id: string, field: string) {
    db.tracks.forEach((track) =>
      track.artistId === id ? (track.artistId = null) : track.artistId,
    );

    db.albums.forEach((album) =>
      album.artistId === id ? (album.artistId = null) : album.artistId,
    );

    db.favorites.artists = db.favorites.artists.filter(
      (artistId) => artistId !== id,
    );

    super.delete(id, field);
  }
}
