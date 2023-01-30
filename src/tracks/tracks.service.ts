import { Injectable } from '@nestjs/common';
import { db } from 'src/repository';
import { CreateTrackDto, UpdateTrackDto } from './tracks.dto';
import { TrackEntity } from './tracks.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TracksService {
  async getTracks(): Promise<TrackEntity[]> {
    return await db.tracks;
  }

  async getTrack(id: string): Promise<TrackEntity> {
    const track = await db.tracks.find((track) => track.id === id);

    return track;
  }

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
    const track = await this.getTrack(id);
    const trackIndex = db.tracks.findIndex((track) => track.id);

    const updatedTrack = {
      ...track,
      ...updateTrackDto,
    };

    db.tracks[trackIndex] = updatedTrack;

    return updatedTrack;
  }

  async deleteTrack(id: string) {
    db.tracks = db.tracks.filter((track) => track.id !== id);

    db.favorites.tracks = db.favorites.tracks.filter(
      (trackId) => trackId !== id,
    );

    return;
  }
}
