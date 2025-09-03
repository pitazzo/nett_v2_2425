import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Genre } from 'src/movies/models/movie.model';

export class UpdateMovieDto {
  @IsString()
  @IsOptional()
  readonly title: string;

  @IsEnum(Genre)
  @IsOptional()
  readonly genre: Genre;

  @Min(1850)
  @Max(new Date().getFullYear())
  @IsNumber()
  @IsOptional()
  readonly year: number;

  @IsString()
  @IsOptional()
  readonly director: string;

  @Min(2)
  @IsNumber()
  @IsOptional()
  readonly minutes: number;
}
