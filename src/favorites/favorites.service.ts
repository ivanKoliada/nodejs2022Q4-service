import { Injectable } from '@nestjs/common';
import { db } from 'src/repository';
import { FavoritesEntity } from './favorites.entity';

@Injectable()
export class FavoritesService {
  async getFavorites(): Promise<FavoritesEntity> {
    return {
      artists: db.favorites.artists.map((artistId) =>
        db.artists.find((artist) => artist.id === artistId),
      ),

      albums: db.favorites.albums.map((albumId) =>
        db.albums.find((album) => album.id === albumId),
      ),

      tracks: db.favorites.tracks.map((trackId) =>
        db.tracks.find((track) => track.id === trackId),
      ),
    };
  }

  async addTrackToFavorite(id: string) {
    const track = db.tracks.find((track) => track.id === id);

    db.favorites.tracks = [...db.favorites.tracks, track.id];

    return track;
  }

  async addAlbumToFavorite(id: string) {
    const album = db.albums.find((album) => album.id === id);

    db.favorites.albums = [...db.favorites.albums, album.id];

    return album;
  }

  async addArtistToFavorite(id: string) {
    const artist = db.artists.find((artist) => artist.id === id);

    db.favorites.artists = [...db.favorites.artists, artist.id];

    return artist;
  }

  async deleteTrackFromFavorites(id: string) {
    const track = db.favorites.tracks.find((track) => track.id === id);

    db.favorites.tracks = db.favorites.tracks.filter(
      (track) => track.id !== id,
    );

    return track;
  }

  async deleteAlbumFromFavorites(id: string) {
    const album = db.favorites.albums.find((album) => album.id === id);

    db.favorites.albums = db.favorites.albums.filter(
      (album) => album.id !== id,
    );

    return album;
  }

  async deleteArtistFromFavorites(id: string) {
    const artist = db.favorites.artists.find((artist) => artist.id === id);

    db.favorites.artists = db.favorites.artists.filter(
      (artist) => artist.id !== id,
    );

    return artist;
  }
}
