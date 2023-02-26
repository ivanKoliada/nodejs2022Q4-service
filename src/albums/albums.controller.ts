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
  NotFoundException,
} from '@nestjs/common';
import { DB_FIELD, MSG } from 'src/shared/constants';
import { CreateAlbumDto, UpdateAlbumDto } from './albums.dto';
import { AlbumsService } from './albums.service';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  async getAlbums() {
    return await this.albumsService.getAll(DB_FIELD.ALBUM);
  }

  @Get(':id')
  async getAlbum(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    const album = await this.albumsService.getById(id, DB_FIELD.ALBUM);

    if (album) return album;

    throw new NotFoundException(MSG.ALBUM_NOT_FOUND);
  }

  @Post()
  async createAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    return await this.albumsService.create(createAlbumDto, DB_FIELD.ALBUM);
  }

  @Put(':id')
  async updateAlbum(
    @Param('id', new ParseUUIDPipe())
    id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const album = await this.albumsService.getById(id, DB_FIELD.ALBUM);

    if (!album) {
      throw new NotFoundException(MSG.ALBUM_NOT_FOUND);
    }

    return await this.albumsService.update(id, updateAlbumDto, DB_FIELD.ALBUM);
  }

  @Delete(':id')
  async deleteAlbum(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    const album = await this.albumsService.getById(id, DB_FIELD.ALBUM);

    if (!album) {
      throw new NotFoundException(MSG.ALBUM_NOT_FOUND);
    }

    await this.albumsService.delete(id, DB_FIELD.ALBUM);

    throw new HttpException(MSG.NO_CONTENT, HttpStatus.NO_CONTENT);
  }
}
