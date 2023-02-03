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
import { DB_FIELD, MSG } from 'src/shared/constants';
import { CreateAlbumDto, UpdateAlbumDto } from './albums.dto';
import { AlbumsService } from './albums.service';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  async getAlbums() {
    return await this.albumsService.getAll();
  }

  @Get(':id')
  async getAlbum(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    const album = await this.albumsService.getById(id);

    if (album) return album;

    throw new HttpException(MSG.ALBUM_NOT_FOUND, HttpStatus.NOT_FOUND);
  }

  @Post()
  async createAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    return await this.albumsService.createAlbum(createAlbumDto);
  }

  @Put(':id')
  async updateAlbum(
    @Param('id', new ParseUUIDPipe())
    id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const album = await this.albumsService.getById(id);

    if (!album) {
      throw new HttpException(MSG.ALBUM_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return await this.albumsService.updateAlbum(id, updateAlbumDto);
  }

  @Delete(':id')
  async deleteAlbum(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    const album = await this.albumsService.getById(id);

    if (!album) {
      throw new HttpException(MSG.ALBUM_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    await this.albumsService.deleteAlbum(id);

    throw new HttpException(MSG.NO_CONTENT, HttpStatus.NO_CONTENT);
  }
}
