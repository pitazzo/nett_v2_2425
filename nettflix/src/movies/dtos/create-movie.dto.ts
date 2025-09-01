import { IsEnum, IsNumber, IsString, Max, Min } from 'class-validator';
import { Genre } from 'src/movies/models/movie.model';

export class CreateMovieDto {
  @IsString()
  readonly title: string;

  @IsEnum(Genre)
  readonly genre: Genre;

  @Min(1850)
  @Max(new Date().getFullYear())
  @IsNumber()
  readonly year: number;

  @IsString()
  readonly director: string;

  @Min(2)
  @IsNumber()
  readonly minutes: number;
}
