import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';

@Module({
  imports: [],
  controllers: [TracksController],
  providers: [TracksService, PrismaService],
})
export class TracksModule {}
