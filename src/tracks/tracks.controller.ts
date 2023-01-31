import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { MSG } from 'src/shared/constants';
import { CreateTrackDto, UpdateTrackDto } from './tracks.dto';
import { TracksService } from './tracks.service';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  async getTracks() {
    return await this.tracksService.getTracks();
  }

  @Get(':id')
  async getTrack(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    const track = await this.tracksService.getTrack(id);

    if (track) return track;

    throw new HttpException(MSG.TRACK_NOT_FOUND, HttpStatus.NOT_FOUND);
  }

  @Post()
  async createTrack(@Body() createTrackDto: CreateTrackDto) {
    return await this.tracksService.createTrack(createTrackDto);
  }

  @Put(':id')
  async updateTrack(
    @Param('id', new ParseUUIDPipe())
    id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const track = await this.tracksService.getTrack(id);

    if (!track) {
      throw new HttpException(MSG.TRACK_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return await this.tracksService.updateTrack(id, updateTrackDto);
  }

  @Delete(':id')
  async deleteTrack(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    const track = await this.tracksService.getTrack(id);

    if (!track) {
      throw new HttpException(MSG.TRACK_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    await this.tracksService.deleteTrack(id);

    throw new HttpException(MSG.NO_CONTENT, HttpStatus.NO_CONTENT);
  }
}
