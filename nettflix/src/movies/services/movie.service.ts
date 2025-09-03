import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from 'src/movies/dtos/create-movie.dto';
import { UpdateMovieDto } from 'src/movies/dtos/update-movie.dto';
import { Genre, Movie } from 'src/movies/models/movie.model';
import { v4 } from 'uuid';

@Injectable()
export class MovieService {
  db: Movie[] = [
    {
      id: 'aa9d2986-fbbd-4d31-8d5c-1ec8ae11f368',
      title: 'La naranja mecánica',
      genre: Genre.DRAMA,
      year: 1972,
      director: 'Stanley Kubrick',
      minutes: 120,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '71f7913e-98c9-4a63-b986-cf1fc3730e3a',
      title: 'El Apartamento',
      genre: Genre.COMEDY,
      year: 1964,
      director: 'Billy Wilder',
      minutes: 90,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'bfb72c16-c0c9-4d26-8354-e76ee7331dd9',
      title: 'Harry Potter I',
      genre: Genre.FANTASY,
      year: 2002,
      director: 'Chris Columbus',
      minutes: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '59da6b61-e5c6-4de5-961a-7405750bf6c1',
      title: 'Sherk I',
      genre: Genre.FANTASY,
      year: 2002,
      director: 'Fulanito',
      minutes: 110,
      createdAt: new Date(),
      updatedAt: new Date(),
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

  createMovie(dto: CreateMovieDto) {
    const movie = new Movie(
      v4(),
      dto.title,
      dto.genre,
      dto.year,
      dto.director,
      dto.minutes,
      new Date(),
      new Date(),
    );

    this.db.push(movie);

    return movie;
  }

  updateMovie(id: string, dto: UpdateMovieDto) {
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

    return updatedMovie;
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
