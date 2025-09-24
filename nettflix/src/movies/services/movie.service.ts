import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMovieDto } from 'src/movies/dtos/create-movie.dto';
import { UpsertReviewDto } from 'src/movies/dtos/upsert-review.dto';
import { DetailedMovieDto } from 'src/movies/dtos/detailed-movie.dto';
import { MovieListItemDto } from 'src/movies/dtos/movie-list-item.dto';
import { DetailedReviewDto } from 'src/movies/dtos/detailed-review.dto';
import { UpdateMovieDto } from 'src/movies/dtos/update-movie.dto';
import { Genre, Movie } from 'src/movies/models/movie.model';
import { v4 } from 'uuid';
import { ModerationService } from 'src/movies/services/moderation.service';

@Injectable()
export class MovieService {
  constructor(private readonly moderationService: ModerationService) {}

  db: Movie[] = [
    {
      id: 'aa9d2986-fbbd-4d31-8d5c-1ec8ae11f368',
      title: 'La naranja mecánica',
      synopsys: 'Bla bla bla',
      genre: Genre.DRAMA,
      year: 1972,
      director: 'Stanley Kubrick',
      minutes: 120,
      reviews: [
        {
          id: 'bbafee9c-5ce5-45d9-bf48-d3cb581671e0',
          score: 10,
          text: 'Probablemente, la mejor peli de la historia',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '71f7913e-98c9-4a63-b986-cf1fc3730e3a',
      title: 'El Apartamento',
      synopsys: 'Bla bla bla',
      genre: Genre.COMEDY,
      year: 1964,
      director: 'Billy Wilder',
      minutes: 90,
      reviews: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'bfb72c16-c0c9-4d26-8354-e76ee7331dd9',
      title: 'Harry Potter I',
      synopsys: 'Bla bla bla',
      genre: Genre.FANTASY,
      year: 2002,
      director: 'Chris Columbus',
      minutes: 100,
      reviews: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '59da6b61-e5c6-4de5-961a-7405750bf6c1',
      title: 'Sherk I',
      synopsys: 'Bla bla bla',
      genre: Genre.FANTASY,
      year: 2002,
      director: 'Fulanito',
      minutes: 110,
      reviews: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  getAllMovies(): MovieListItemDto[] {
    return this.db.map((movie) => MovieListItemDto.fromModel(movie));
  }

  getMoviesByYear(year: number): MovieListItemDto[] {
    return this.db
      .filter((movie) => movie.year === year)
      .map((movie) => MovieListItemDto.fromModel(movie));
  }

  getMovieById(id: string): DetailedMovieDto {
    const movie = this.db.find((movie) => movie.id === id);

    if (!movie) {
      throw new NotFoundException(`No movie with ID ${id} was found`);
    }

    return DetailedMovieDto.fromModel(movie);
  }

  createMovie(dto: CreateMovieDto): DetailedMovieDto {
    const movie = new Movie(
      v4(),
      dto.title,
      '???',
      dto.genre,
      dto.year,
      dto.director,
      dto.minutes,
      [],
      new Date(),
      new Date(),
    );

    this.db.push(movie);

    return DetailedMovieDto.fromModel(movie);
  }

  updateMovie(id: string, dto: UpdateMovieDto): DetailedMovieDto {
    const index = this.db.findIndex((movie) => movie.id === id);

    if (index === -1) {
      throw new NotFoundException(`No movie with ID ${id} was found`);
    }

    const updatedMovie = {
      ...this.db[index],
      ...dto,
      updatedAt: new Date(),
    };

    this.db[index] = updatedMovie;

    return DetailedMovieDto.fromModel(updatedMovie);
  }

  deleteMovie(id: string): DetailedMovieDto {
    const movie = this.db.find((movie) => movie.id === id);

    if (!movie) {
      throw new NotFoundException(`No movie with ID ${id} was found`);
    }

    this.db = this.db.filter((movie) => movie.id !== id);

    return DetailedMovieDto.fromModel(movie);
  }

  async createReview(id: string, body: UpsertReviewDto) {
    const index = this.db.findIndex((movie) => movie.id === id);

    if (index === -1) {
      throw new NotFoundException(`No movie with ID ${id} was found`);
    }

    const isAcceptable = await this.moderationService.isAcceptable(body.text);

    if (!isAcceptable) {
      throw new BadRequestException(
        'The review does not follow the accpetable usage policy',
      );
    }

    const review = {
      id: v4(),
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.db[index].reviews.push(review);

    return DetailedReviewDto.fromModel(review);
  }

  updateReview(
    movieId: string,
    reviewId: string,
    dto: UpsertReviewDto,
  ): DetailedReviewDto {
    const movieIndex = this.db.findIndex((movie) => movie.id === movieId);

    if (movieIndex === -1) {
      throw new NotFoundException(`No movie with ID ${movieId} was found`);
    }

    const movie = this.db[movieIndex];

    const reviewIndex = movie.reviews.findIndex(
      (review) => review.id === reviewId,
    );

    if (reviewIndex === -1) {
      throw new NotFoundException(
        `Movie ${movie.id} has not review with ID ${reviewId}`,
      );
    }

    const oldReview = this.db[movieIndex].reviews[reviewIndex];
    const updatedReview = {
      ...oldReview,
      ...dto,
      updatedAt: new Date(),
    };

    this.db[movieIndex].reviews[reviewIndex] = updatedReview;

    return DetailedReviewDto.fromModel(updatedReview);
  }
}
