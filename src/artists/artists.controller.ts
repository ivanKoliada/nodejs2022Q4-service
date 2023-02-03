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
    return await this.artistsService.getAll();
  }

  @Get(':id')
  async getArtist(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    const artist = await this.artistsService.getById(id);

    if (artist) return artist;

    throw new HttpException(MSG.ARTIST_NOT_FOUND, HttpStatus.NOT_FOUND);
  }

  @Post()
  async createArtist(@Body() createArtistDto: CreateArtistDto) {
    return await this.artistsService.createArtist(createArtistDto);
  }

  @Put(':id')
  async updateArtist(
    @Param('id', new ParseUUIDPipe())
    id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const artist = await this.artistsService.getById(id);

    if (!artist) {
      throw new HttpException(MSG.ARTIST_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return await this.artistsService.updateArtist(id, updateArtistDto);
  }

  @Delete(':id')
  async deleteArtist(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    const artist = await this.artistsService.getById(id);

    if (!artist) {
      throw new HttpException(MSG.ARTIST_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    await this.artistsService.deleteArtist(id);

    throw new HttpException(MSG.NO_CONTENT, HttpStatus.NO_CONTENT);
  }
}
