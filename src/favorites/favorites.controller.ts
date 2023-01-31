import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Delete, Param } from '@nestjs/common/decorators';
import { ENTITY_NAME, MSG } from 'src/constants';
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
      ENTITY_NAME.TRACKS,
    );

    if (track) {
      throw new HttpException(MSG.TRACK_ADDED, HttpStatus.CREATED);
    }

    throw new HttpException(
      MSG.TRACK_NOT_FOUND,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  @Post('album/:id')
  async addAlbumToFavorite(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = await this.favoritesService.addToFavorites(
      id,
      ENTITY_NAME.ALBUMS,
    );

    if (album) {
      throw new HttpException(MSG.ALBUM_ADDED, HttpStatus.CREATED);
    }

    throw new HttpException(
      MSG.ALBUM_NOT_FOUND,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  @Post('artist/:id')
  async addArtistToFavorite(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = await this.favoritesService.addToFavorites(
      id,
      ENTITY_NAME.ARTISTS,
    );

    if (artist) {
      throw new HttpException(MSG.ARTIST_ADDED, HttpStatus.CREATED);
    }

    throw new HttpException(
      MSG.ARTIST_NOT_FOUND,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  @Delete('track/:id')
  async deleteTrackFromFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = await this.favoritesService.deleteFromFavorites(
      id,
      ENTITY_NAME.TRACKS,
    );

    if (track) {
      throw new HttpException(MSG.TRACK_DELETED, HttpStatus.NO_CONTENT);
    }

    throw new HttpException(MSG.TRACK_NOT_FOUND, HttpStatus.NOT_FOUND);
  }

  @Delete('album/:id')
  async deleteAlbumFromFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = await this.favoritesService.deleteFromFavorites(
      id,
      ENTITY_NAME.ALBUMS,
    );

    if (album) {
      throw new HttpException(MSG.ALBUM_DELETED, HttpStatus.NO_CONTENT);
    }

    throw new HttpException(MSG.ALBUM_NOT_FOUND, HttpStatus.NOT_FOUND);
  }

  @Delete('artist/:id')
  async deleteArtistFromFavorites(
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    const artist = await this.favoritesService.deleteFromFavorites(
      id,
      ENTITY_NAME.ARTISTS,
    );

    if (artist) {
      throw new HttpException(MSG.ARTIST_DELETED, HttpStatus.NO_CONTENT);
    }

    throw new HttpException(MSG.ARTIST_NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}
