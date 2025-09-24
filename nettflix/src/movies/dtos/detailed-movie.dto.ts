import { DetailedReviewDto } from 'src/movies/dtos/detailed-review.dto';
import { Genre, Movie } from 'src/movies/models/movie.model';

export class DetailedMovieDto {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly synopsis: string,
    public readonly genre: Genre,
    public readonly year: number,
    public readonly director: string,
    public readonly minutes: number,
    public readonly reviews: DetailedReviewDto[],
  ) {}

  static fromModel(movie: Movie) {
    return new DetailedMovieDto(
      movie.id,
      movie.title,
      movie.synopsis,
      movie.genre,
      movie.year,
      movie.director,
      movie.minutes,
      movie.reviews.map((review) => DetailedReviewDto.fromModel(review)),
    );
  }
}
