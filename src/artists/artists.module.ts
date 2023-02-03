import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';

@Module({
  imports: [PrismaService],
  controllers: [ArtistsController],
  providers: [ArtistsService, PrismaService],
})
export class ArtistsModule {}
