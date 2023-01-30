import {
  IsNumber,
  IsString,
  IsOptional,
  IsUUID,
  IsNotEmpty,
} from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsUUID('4')
  @IsOptional()
  artistId: string | null;

  @IsUUID('4')
  @IsOptional()
  albumId: string | null;

  @IsNotEmpty()
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
