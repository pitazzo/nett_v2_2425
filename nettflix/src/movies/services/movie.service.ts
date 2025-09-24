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
import { Movie } from 'src/movies/models/movie.model';
import { ModerationService } from 'src/movies/services/moderation.service';
import { SynopsisService } from 'src/movies/services/synopsis.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from 'src/movies/models/review.model';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    private readonly moderationService: ModerationService,
    private readonly synopsisService: SynopsisService,
  ) {}

  async getAllMovies(): Promise<MovieListItemDto[]> {
    const movies = await this.movieRepository.find();
    return movies.map((movie) => MovieListItemDto.fromModel(movie));
  }

  async getMoviesByYear(year: number): Promise<MovieListItemDto[]> {
    const movies = await this.movieRepository.find({
      where: {
        year,
      },
    });

    return movies.map((movie) => MovieListItemDto.fromModel(movie));
  }

  async getMovieById(id: string): Promise<DetailedMovieDto> {
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ['reviews'],
    });

    if (!movie) {
      throw new NotFoundException(`No movie with ID ${id} was found`);
    }

    return DetailedMovieDto.fromModel(movie);
  }

  async createMovie(dto: CreateMovieDto): Promise<DetailedMovieDto> {
    const movie = new Movie(
      dto.title,
      await this.synopsisService.getSynopsis(dto.title),
      dto.genre,
      dto.year,
      dto.director,
      dto.minutes,
      [],
      new Date(),
      new Date(),
    );

    await this.movieRepository.save(movie);

    return DetailedMovieDto.fromModel(movie);
  }

  async updateMovie(
    id: string,
    dto: UpdateMovieDto,
  ): Promise<DetailedMovieDto> {
    const movie = await this.movieRepository.findOne({ where: { id } });

    if (!movie) {
      throw new NotFoundException(`No movie with ID ${id} was found`);
    }

    const updatedMovie = {
      ...movie,
      ...dto,
      updatedAt: new Date(),
    };

    await this.movieRepository.save(updatedMovie);

    return DetailedMovieDto.fromModel(updatedMovie);
  }

  async deleteMovie(id: string): Promise<DetailedMovieDto> {
    const movie = await this.movieRepository.findOne({ where: { id } });

    if (!movie) {
      throw new NotFoundException(`No movie with ID ${id} was found`);
    }

    await this.movieRepository.delete({ id });

    return DetailedMovieDto.fromModel(movie);
  }

  async createReview(id: string, body: UpsertReviewDto) {
    const movie = await this.movieRepository.findOne({ where: { id } });

    if (!movie) {
      throw new NotFoundException(`No movie with ID ${id} was found`);
    }

    const isAcceptable = await this.moderationService.isAcceptable(body.text);

    if (!isAcceptable) {
      throw new BadRequestException(
        'The review does not follow the accpetable usage policy',
      );
    }

    const review = this.reviewRepository.create({
      text: body.text,
      score: body.score,
      createdAt: new Date(),
      updatedAt: new Date(),
      movie: {
        id,
      },
    });

    await this.reviewRepository.save(review);

    return DetailedReviewDto.fromModel(review);
  }

  async updateReview(
    movieId: string,
    reviewId: string,
    dto: UpsertReviewDto,
  ): Promise<DetailedReviewDto> {
    const movie = await this.movieRepository.findOne({
      where: { id: movieId },
    });

    if (!movie) {
      throw new NotFoundException(`No movie with ID ${movieId} was found`);
    }

    const oldReview = await this.reviewRepository.findOne({
      where: { id: reviewId },
    });

    if (!oldReview) {
      throw new NotFoundException(
        `Movie ${movie.id} has not review with ID ${reviewId}`,
      );
    }

    const isAcceptable = await this.moderationService.isAcceptable(dto.text);

    if (!isAcceptable) {
      throw new BadRequestException(
        'The review does not follow the accpetable usage policy',
      );
    }

    const updatedReview = {
      ...oldReview,
      ...dto,
      updatedAt: new Date(),
    };

    await this.reviewRepository.save(updatedReview);

    return DetailedReviewDto.fromModel(updatedReview);
  }
}
