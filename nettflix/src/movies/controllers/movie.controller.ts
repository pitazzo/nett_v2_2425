import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateMovieDto } from 'src/movies/dtos/create-movie.dto';
import { CreateReviewDto } from 'src/movies/dtos/create-review.dto';
import { UpdateMovieDto } from 'src/movies/dtos/update-movie.dto';
import { MovieService } from 'src/movies/services/movie.service';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  getAllMovies() {
    return this.movieService.getAllMovies();
  }

  @Get('/year/:year')
  getByYear(@Param('year', ParseIntPipe) year: number) {
    return this.movieService.getMoviesByYear(year);
  }

  @Get('/:id')
  getMovieById(@Param('id', ParseUUIDPipe) id: string) {
    return this.movieService.getMovieById(id);
  }

  @Post()
  createMovie(@Body() body: CreateMovieDto) {
    return this.movieService.createMovie(body);
  }

  @Delete('/:id')
  deleteMovie(@Param('id', ParseUUIDPipe) id: string) {
    return this.movieService.deleteMovie(id);
  }

  @Patch('/:id')
  updateMovie(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateMovieDto,
  ) {
    return this.movieService.updateMovie(id, body);
  }

  @Post('/:id/review')
  createReview(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: CreateReviewDto,
  ) {
    return this.movieService.createReview(id, body);
  }
}
