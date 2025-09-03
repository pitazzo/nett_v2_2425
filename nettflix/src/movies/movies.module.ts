import { Module } from '@nestjs/common';
import { MovieController } from 'src/movies/controllers/movie.controller';
import { ModerationService } from 'src/movies/services/moderation.service';
import { MovieService } from 'src/movies/services/movie.service';

@Module({
  controllers: [MovieController],
  providers: [MovieService, ModerationService],
})
export class MoviesModule {}
