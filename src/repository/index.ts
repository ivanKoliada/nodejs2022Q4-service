import { DBModel } from '../models';

export const db: DBModel = {
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
