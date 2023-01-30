import { IsNumber, IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  name: string;

  @IsUUID('4')
  @IsOptional()
  artistId: string | null;

  @IsUUID('4')
  @IsOptional()
  albumId: string | null;

  @IsNumber()
  duration: number;
}

export class UpdateTrackDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsUUID('4')
  @IsOptional()
  artistId: string | null;

  @IsUUID('4')
  @IsOptional()
  albumId: string | null;

  @IsNumber()
  @IsOptional()
  duration: number;
}
