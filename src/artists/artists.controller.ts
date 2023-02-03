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
import { PrismaService } from 'src/prisma/prisma.service';
import { BasicService } from 'src/shared/basicService';
import { DB_FIELD, MSG } from 'src/shared/constants';
import { CreateArtistDto, UpdateArtistDto } from './artists.dto';
import { ArtistsService } from './artists.service';
// import { Prisma, Artist } from '@prisma/client';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  async getArtists() {
    return await this.artistsService.getAll(DB_FIELD.ARTIST);
  }

  @Get(':id')
  async getArtist(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    const artist = await this.artistsService.getById(id, DB_FIELD.ARTIST);

    if (artist) return artist;

    throw new HttpException(MSG.ARTIST_NOT_FOUND, HttpStatus.NOT_FOUND);
  }

  @Post()
  async createArtist(@Body() createArtistDto: CreateArtistDto) {
    return await this.artistsService.create(createArtistDto, DB_FIELD.ARTIST);
  }

  @Put(':id')
  async updateArtist(
    @Param('id', new ParseUUIDPipe())
    id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const artist = await this.artistsService.getById(id, DB_FIELD.ARTIST);

    if (!artist) {
      throw new HttpException(MSG.ARTIST_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return await this.artistsService.update(
      id,
      updateArtistDto,
      DB_FIELD.ARTIST,
    );
  }

  @Delete(':id')
  async deleteArtist(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    const artist = await this.artistsService.getById(id, DB_FIELD.ARTIST);

    if (!artist) {
      throw new HttpException(MSG.ARTIST_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    await this.artistsService.delete(id, DB_FIELD.ARTIST);

    throw new HttpException(MSG.NO_CONTENT, HttpStatus.NO_CONTENT);
  }
}
