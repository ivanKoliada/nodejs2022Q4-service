import { Injectable } from '@nestjs/common';
import { db } from 'src/repository';
import { FavoritesEntity } from './favorites.entity';

@Injectable()
export class FavoritesService {
  async getFavorites(): Promise<FavoritesEntity> {
    return {
      artists: db.artists.filter(({ id }) => db.favorites.artists.includes(id)),
      albums: db.albums.filter(({ id }) => db.favorites.albums.includes(id)),
      tracks: db.tracks.filter(({ id }) => db.favorites.tracks.includes(id)),
    };
  }

  async addToFavorites(id: string, entity: string) {
    const item = db[entity].find((el) => el.id === id);

    if (!item) return;

    db.favorites[entity] = [...db.favorites[entity], item.id];

    return item;
  }

  async deleteFromFavorites(id: string, entity: string) {
    const item = db[entity].find((el) => el.id === id);

    if (!item) return;

    db.favorites[entity] = db.favorites[entity].filter((_id) => _id !== id);

    return item;
  }
}
