import { Module } from '@nestjs/common';
import { MoviesModule } from 'src/movies/movies.module';

@Module({
  imports: [MoviesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
