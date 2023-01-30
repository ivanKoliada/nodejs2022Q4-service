import { Injectable } from '@nestjs/common';
import { db } from 'src/repository';
import { CreateArtistDto, UpdateArtistDto } from './artists.dto';
import { ArtistEntity } from './artists.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ArtistsService {
  async getArtists(): Promise<ArtistEntity[]> {
    return await db.artists;
  }

  async getArtist(id: string): Promise<ArtistEntity> {
    const artist = await db.artists.find((artist) => artist.id === id);

    return artist;
  }

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
    const artist = await this.getArtist(id);
    const artistIndex = db.artists.findIndex((artist) => artist.id);

    const updatedArtist = {
      ...artist,
      ...updateArtistDto,
    };

    db.artists[artistIndex] = updatedArtist;

    return updatedArtist;
  }

  async deleteArtist(id: string) {
    db.artists = db.artists.filter((artist) => artist.id !== id);

    db.tracks = db.tracks.map(
      (track) => {
        return {
          ...track,
          artistId: track.artistId === id ? null : track.artistId,
        };
      },
      // track.artistId === id ? (track.artistId = null) : track.artistId,
    );

    db.albums = db.albums.map(
      (album) => {
        return {
          ...album,
          artistId: album.artistId === id ? null : album.artistId,
        };
      },
      // album.artistId === id ? (album.artistId = null) : album.artistId,
    );

    db.favorites.artists = db.favorites.artists.filter(
      (artistId) => artistId !== id,
    );

    return;
  }
}
