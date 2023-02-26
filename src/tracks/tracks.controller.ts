import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { DB_FIELD, MSG } from 'src/shared/constants';
import { CreateTrackDto, UpdateTrackDto } from './tracks.dto';
import { TracksService } from './tracks.service';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  async getTracks() {
    return await this.tracksService.getAll(DB_FIELD.TRACK);
  }

  @Get(':id')
  async getTrack(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    const track = await this.tracksService.getById(id, DB_FIELD.TRACK);

    if (track) return track;

    throw new NotFoundException(MSG.TRACK_NOT_FOUND);
  }

  @Post()
  async createTrack(@Body() createTrackDto: CreateTrackDto) {
    return await this.tracksService.create(createTrackDto, DB_FIELD.TRACK);
  }

  @Put(':id')
  async updateTrack(
    @Param('id', new ParseUUIDPipe())
    id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const track = await this.tracksService.getById(id, DB_FIELD.TRACK);

    if (!track) {
      throw new NotFoundException(MSG.TRACK_NOT_FOUND);
    }

    return await this.tracksService.update(id, updateTrackDto, DB_FIELD.TRACK);
  }

  @Delete(':id')
  async deleteTrack(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    const track = await this.tracksService.getById(id, DB_FIELD.TRACK);

    if (!track) {
      throw new NotFoundException(MSG.TRACK_NOT_FOUND);
    }

    await this.tracksService.delete(id, DB_FIELD.TRACK);

    throw new HttpException(MSG.NO_CONTENT, HttpStatus.NO_CONTENT);
  }
}
