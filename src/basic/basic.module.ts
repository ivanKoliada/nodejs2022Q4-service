import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BasicService } from './basic.service';

@Module({
  imports: [],
  providers: [BasicService, PrismaService],
})
export class BasicModule {}
