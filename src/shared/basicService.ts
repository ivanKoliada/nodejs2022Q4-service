import { AlbumEntity } from 'src/albums/albums.entity';
import { ArtistEntity } from 'src/artists/artists.entity';
import { db } from 'src/repository';
import { TrackEntity } from 'src/tracks/tracks.entity';

export class BasicService {
  async findAll(
    field: string,
  ): Promise<ArtistEntity[] | AlbumEntity[] | TrackEntity[]> {
    return await db[field];
  }

  async findOne(
    field: string,
    id: string,
  ): Promise<ArtistEntity | AlbumEntity | TrackEntity> {
    return await db[field].find((item) => item.id === id);
  }

  async delete(field: string, id: string) {
    db[field] = db[field].filter((item) => item.id !== id);

    return;
  }
}
