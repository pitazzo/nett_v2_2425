import { Module } from '@nestjs/common';
import { MovieController } from 'src/movies/controllers/movie.controller';
import { AIService } from 'src/movies/services/ai.service';
import { ModerationService } from 'src/movies/services/moderation.service';
import { MovieService } from 'src/movies/services/movie.service';
import { SynopsisService } from 'src/movies/services/synopsis.service';

@Module({
  controllers: [MovieController],
  providers: [MovieService, ModerationService, SynopsisService, AIService],
})
export class MoviesModule {}
