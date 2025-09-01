import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from 'src/movies/models/movie.model';

@Injectable()
export class MovieService {
  db: Movie[] = [
    {
      id: 'aa9d2986-fbbd-4d31-8d5c-1ec8ae11f368',
      title: 'La naranja mecánica',
      genre: 'drama',
      year: 1972,
      director: 'Stanley Kubrick',
      minutes: 120,
    },
    {
      id: '71f7913e-98c9-4a63-b986-cf1fc3730e3a',
      title: 'El Apartamento',
      genre: 'comedy',
      year: 1964,
      director: 'Billy Wilder',
      minutes: 90,
    },
    {
      id: 'bfb72c16-c0c9-4d26-8354-e76ee7331dd9',
      title: 'Harry Potter I',
      genre: 'fantasy',
      year: 2002,
      director: 'Chris Columbus',
      minutes: 100,
    },
    {
      id: '59da6b61-e5c6-4de5-961a-7405750bf6c1',
      title: 'Sherk I',
      genre: 'fantasy',
      year: 2002,
      director: 'Fulanito',
      minutes: 110,
    },
  ];

  getAllMovies(): Movie[] {
    return this.db;
  }

  getMoviesByYear(year: number): Movie[] {
    return this.db.filter((movie) => movie.year === year);
  }

  getMovieById(id: string): Movie {
    const movie = this.db.find((movie) => movie.id === id);

    if (!movie) {
      throw new NotFoundException(`No movie with ID ${id} was found`);
    }

    return movie;
  }

  deleteMovie(id: string) {
    const movie = this.db.find((movie) => movie.id === id);

    if (!movie) {
      throw new NotFoundException(`No movie with ID ${id} was found`);
    }

    this.db = this.db.filter((movie) => movie.id !== id);

    return movie;
  }
}
