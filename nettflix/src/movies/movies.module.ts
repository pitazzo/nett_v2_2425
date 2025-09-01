import { Module } from '@nestjs/common';
import { MovieController } from 'src/movies/controllers/movie.controller';
import { MovieService } from 'src/movies/services/movie.service';

@Module({
  controllers: [MovieController],
  providers: [MovieService],
})
export class MoviesModule {}
