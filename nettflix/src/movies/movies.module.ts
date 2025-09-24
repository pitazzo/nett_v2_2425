import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieController } from 'src/movies/controllers/movie.controller';
import { Movie } from 'src/movies/models/movie.model';
import { AIService } from 'src/movies/services/ai.service';
import { ModerationService } from 'src/movies/services/moderation.service';
import { MovieService } from 'src/movies/services/movie.service';
import { SynopsisService } from 'src/movies/services/synopsis.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  controllers: [MovieController],
  providers: [MovieService, ModerationService, SynopsisService, AIService],
})
export class MoviesModule {}
