import { Injectable } from '@nestjs/common';
import { db } from 'src/repository';
import { CreateTrackDto, UpdateTrackDto } from './tracks.dto';
import { TrackEntity } from './tracks.entity';
import { v4 as uuid } from 'uuid';
import { BasicService } from 'src/shared/basicService';
import { DB_FIELD } from 'src/shared/constants';

@Injectable()
export class TracksService extends BasicService {
  async createTrack(createTrackDto: CreateTrackDto): Promise<TrackEntity> {
    const newTrack = {
      id: uuid(),
      artistId: null,
      albumId: null,
      ...createTrackDto,
    };

    db.tracks = [...db.tracks, newTrack];

    return newTrack;
  }

  async updateTrack(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<TrackEntity> {
    const track = await this.findOne(id, DB_FIELD.TRACKS);
    const trackIndex = db.tracks.findIndex((track) => track.id);

    const updatedTrack = {
      ...track,
      ...updateTrackDto,
    };

    db.tracks[trackIndex] = updatedTrack;

    return updatedTrack;
  }

  async delete(id: string, field: string) {
    db.favorites.tracks = db.favorites.tracks.filter(
      (trackId) => trackId !== id,
    );

    super.delete(id, field);
  }
}
