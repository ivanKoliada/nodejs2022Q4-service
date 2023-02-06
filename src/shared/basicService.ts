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
    id: string,
    field: string,
  ): Promise<ArtistEntity | AlbumEntity | TrackEntity> {
    return await db[field].find((item) => item.id === id);
  }

  async delete(id: string, field: string) {
    db[field] = db[field].filter((item) => item.id !== id);

    return;
  }
}
