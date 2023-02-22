import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  ParseUUIDPipe,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Delete, Param } from '@nestjs/common/decorators';
import { DB_FIELD, MSG } from 'src/shared/constants';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async getFavorites() {
    return await this.favoritesService.getFavorites();
  }

  @Post('track/:id')
  async addTrackToFavorite(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = await this.favoritesService.addToFavorites(
      id,
      DB_FIELD.TRACK,
    );

    if (track) {
      throw new HttpException(MSG.TRACK_ADDED, HttpStatus.CREATED);
    }

    throw new UnprocessableEntityException(MSG.TRACK_NOT_FOUND);
  }

  @Post('album/:id')
  async addAlbumToFavorite(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = await this.favoritesService.addToFavorites(
      id,
      DB_FIELD.ALBUM,
    );

    if (album) {
      throw new HttpException(MSG.ALBUM_ADDED, HttpStatus.CREATED);
    }

    throw new UnprocessableEntityException(MSG.ALBUM_NOT_FOUND);
  }

  @Post('artist/:id')
  async addArtistToFavorite(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = await this.favoritesService.addToFavorites(
      id,
      DB_FIELD.ARTIST,
    );

    if (artist) {
      throw new HttpException(MSG.ARTIST_ADDED, HttpStatus.CREATED);
    }

    throw new UnprocessableEntityException(MSG.ARTIST_NOT_FOUND);
  }

  @Delete('track/:id')
  async deleteTrackFromFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = await this.favoritesService.deleteFromFavorites(
      id,
      DB_FIELD.TRACK,
    );

    if (track) {
      throw new HttpException(MSG.TRACK_DELETED, HttpStatus.NO_CONTENT);
    }

    throw new NotFoundException(MSG.TRACK_NOT_FOUND);
  }

  @Delete('album/:id')
  async deleteAlbumFromFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = await this.favoritesService.deleteFromFavorites(
      id,
      DB_FIELD.ALBUM,
    );

    if (album) {
      throw new HttpException(MSG.ALBUM_DELETED, HttpStatus.NO_CONTENT);
    }

    throw new NotFoundException(MSG.ALBUM_NOT_FOUND);
  }

  @Delete('artist/:id')
  async deleteArtistFromFavorites(
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    const artist = await this.favoritesService.deleteFromFavorites(
      id,
      DB_FIELD.ARTIST,
    );

    if (artist) {
      throw new HttpException(MSG.ARTIST_DELETED, HttpStatus.NO_CONTENT);
    }

    throw new NotFoundException(MSG.ARTIST_NOT_FOUND);
  }
}
