import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumsModule } from './albums/albums.module';
import { ArtistsModule } from './artists/artists.module';
import { TracksModule } from './tracks/tracks.module';
import { UsersModule } from './users/users.module';
import { FavoritesModule } from './favorites/favorites.module';
import { PrismaModule } from './prisma/prisma.module';
import { BasicModule } from './basic/basic.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AlbumsModule,
    ArtistsModule,
    TracksModule,
    UsersModule,
    FavoritesModule,
    PrismaModule,
    BasicModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
