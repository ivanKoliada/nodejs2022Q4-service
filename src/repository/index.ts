import { IDb } from 'src/shared/interfaces';

export const db: IDb = {
  users: [],
  albums: [],
  artists: [],
  tracks: [],
  favorites: {
    artists: [],
    albums: [],
    tracks: [],
  },
};
