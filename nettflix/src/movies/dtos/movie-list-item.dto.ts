import { Genre, Movie } from 'src/movies/models/movie.model';

export class MovieListItemDto {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly genre: Genre,
    public readonly year: number,
    public readonly director: string,
  ) {}

  static fromModel(movie: Movie) {
    return new MovieListItemDto(
      movie.id,
      movie.title,
      movie.genre,
      movie.year,
      movie.director,
    );
  }
}
