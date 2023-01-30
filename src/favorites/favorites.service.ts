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

    if (!track) return;

    db.favorites.tracks = [...db.favorites.tracks, track.id];

    return track;
  }

  async addAlbumToFavorite(id: string) {
    const album = db.albums.find((album) => album.id === id);

    if (!album) return;

    db.favorites.albums = [...db.favorites.albums, album.id];

    return album;
  }

  async addArtistToFavorite(id: string) {
    const artist = db.artists.find((artist) => artist.id === id);

    if (!artist) return;

    db.favorites.artists = [...db.favorites.artists, artist.id];

    return artist;
  }

  async deleteTrackFromFavorites(id: string) {
    const track = db.tracks.find((track) => track.id === id);

    if (!track) return;

    db.favorites.tracks = db.favorites.tracks.filter(
      (trackId) => trackId !== id,
    );

    return track;
  }

  async deleteAlbumFromFavorites(id: string) {
    const album = db.albums.find((album) => album.id === id);

    if (!album) return;

    db.favorites.albums = db.favorites.albums.filter(
      (albumId) => albumId !== id,
    );

    return album;
  }

  async deleteArtistFromFavorites(id: string) {
    const artist = db.artists.find((artist) => artist.id === id);

    if (!artist) return;

    db.favorites.artists = db.favorites.artists.filter(
      (artistId) => artistId !== id,
    );

    return artist;
  }
}
