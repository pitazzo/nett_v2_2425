import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MovieService } from 'src/movies/services/movie.service';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  getAllMovies() {
    return this.movieService.getAllMovies();
  }

  @Get('/:id')
  getMovieById(@Param('id') id: string) {
    console.log(`recibiendo getMovieById(${id})`);
    return 'hola desde NestJS!';
  }

  @Post()
  createMovie(@Body() body: any) {
    console.log('recibiendo createMovie');
    console.log(JSON.stringify(body, null, 2));
    return 'hola desde NestJS!';
  }

  @Delete('/:id')
  deleteMovie(@Param('id') id: string) {
    console.log(`recibiendo deleteMovie(${id})`);
    return 'hola desde NestJS!';
  }

  @Patch('/:id')
  updateMovie(@Param('id') id: string, @Body() body: any) {
    console.log(`recibiendo updateMovie(${id})`);
    console.log(JSON.stringify(body, null, 2));
    return 'hola desde NestJS!';
  }
}
