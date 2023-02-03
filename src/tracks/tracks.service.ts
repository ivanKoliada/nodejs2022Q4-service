import { Injectable } from '@nestjs/common';
import { db } from 'src/repository';
import { CreateTrackDto, UpdateTrackDto } from './tracks.dto';
import { TrackEntity } from './tracks.entity';
import { v4 as uuid } from 'uuid';
import { DB_FIELD } from 'src/shared/constants';
import { PrismaService } from 'src/prisma/prisma.service';
import { BasicService } from 'src/basic/basic.service';

@Injectable()
export class TracksService extends BasicService {
  // async getAll(): Promise<TrackEntity[]> {
  //   return await this.prisma.track.findMany();
  // }
  // async getById(id: string): Promise<TrackEntity> {
  //   return await this.prisma.track.findUnique({
  //     where: { id },
  //   });
  // }
  // async createTrack(createTrackDto: CreateTrackDto): Promise<TrackEntity> {
  //   return await this.prisma.track.create({
  //     data: createTrackDto,
  //   });
  // }
  // async updateTrack(
  //   id: string,
  //   updateTrackDto: UpdateTrackDto,
  // ): Promise<TrackEntity> {
  //   return await this.prisma.track.update({
  //     where: {
  //       id,
  //     },
  //     data: updateTrackDto,
  //   });
  // }
  // async deleteTrack(id: string): Promise<TrackEntity> {
  //   return await this.prisma.track.delete({
  //     where: { id },
  //   });
  // }
}
