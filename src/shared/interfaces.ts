import { AlbumEntity } from 'src/albums/albums.entity';
import { ArtistEntity } from 'src/artists/artists.entity';
import { TrackEntity } from 'src/tracks/tracks.entity';
import { UserEntity } from 'src/users/users.entity';

export interface IDb {
  users: UserEntity[];
  tracks: TrackEntity[];
  artists: ArtistEntity[];
  albums: AlbumEntity[];
  favorites: {
    tracks: string[];
    artists: string[];
    albums: string[];
  };
}

export type TEntityName = 'albums' | 'artists' | 'tracks';

export enum EEntityName {
  ARTISTS = 'artists',
  ALBUMS = 'albums',
  TRACKS = 'tracks',
}
