import { Review } from 'src/movies/models/review.model';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Genre {
  COMEDY = 'comedy',
  DRAMA = 'drama',
  FANTASY = 'fantasy',
  ANIME = 'anime',
}

@Entity()
export class Movie {
  constructor(
    id: string,
    title: string,
    synopsis: string,
    genre: Genre,
    year: number,
    director: string,
    minutes: number,
    reviews: Review[],
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.title = title;
    this.synopsis = synopsis;
    this.genre = genre;
    this.year = year;
    this.director = director;
    this.minutes = minutes;
    this.reviews = reviews;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @Column()
  public title: string;

  @Column()
  public synopsis: string;

  @Column()
  public genre: Genre;

  @Column()
  public year: number;

  @Column()
  public director: string;

  @Column()
  public minutes: number;

  public reviews: Review[];

  @Column()
  public readonly createdAt: Date;

  @Column()
  public updatedAt: Date;
}
