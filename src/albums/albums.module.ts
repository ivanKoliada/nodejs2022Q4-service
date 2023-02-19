import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';

@Module({
  imports: [],
  controllers: [AlbumsController],
  providers: [AlbumsService, PrismaService],
})
export class AlbumsModule {}
