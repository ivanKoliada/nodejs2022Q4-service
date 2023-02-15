import { LogLevel } from '@nestjs/common';

export const MSG = {
  USER_NOT_FOUND: 'User not found',
  TRACK_NOT_FOUND: 'Track not found',
  ARTIST_NOT_FOUND: 'Artist not found',
  ALBUM_NOT_FOUND: 'Album not found',
  NO_CONTENT: 'No content',
  WRONG_PASSWORD: 'Old password is wrong',
  TRACK_ADDED: 'Track has been successfully added to favorites',
  ARTIST_ADDED: 'Artist has been successfully added to favorites',
  ALBUM_ADDED: 'Album has been successfully added to favorites',
  TRACK_DELETED: 'Track has been successfully deleted from favorites',
  ALBUM_DELETED: 'Album has been successfully deleted from favorites',
  ARTIST_DELETED: 'Artist has been successfully deleted from favorites',
  ACCESS_DENIED: 'No user with such login or wrong password',
  INVALID_TOKEN: 'Token is invalid or expired',
  NO_REFRESH_TOKEN: 'No refreshToken in body',
};

export const DB_FIELD = {
  ARTIST: 'artist',
  ALBUM: 'album',
  TRACK: 'track',
};

export const IS_PUBLIC_ACCESS = 'isPublic';

export const LOG_LEVELS = {
  '0': ['log'],
  '1': ['log', 'error'],
  '2': ['log', 'error', 'warn'],
  '3': ['log', 'error', 'warn', 'debug'],
  '4': ['log', 'error', 'warn', 'debug', 'verbose'],
};

export const LOG_LEVEL: Record<string, LogLevel> = {
  LOG: 'log',
  ERROR: 'error',
  WARN: 'warn',
  DEBUG: 'debug',
  VERBOSE: 'verbose',
};

export const PATH_TO_LOG_FILE = './file.log';
