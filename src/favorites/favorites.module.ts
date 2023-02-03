import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

@Module({
  imports: [PrismaService],
  controllers: [FavoritesController],
  providers: [FavoritesService, PrismaService],
})
export class FavoritesModule {}
