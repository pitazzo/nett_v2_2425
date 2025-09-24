import { Review } from 'src/movies/models/review.model';

export enum Genre {
  COMEDY = 'comedy',
  DRAMA = 'drama',
  FANTASY = 'fantasy',
  ANIME = 'anime',
}

export class Movie {
  constructor(
    public readonly id: string,
    public title: string,
    public synopsys: string,
    public genre: Genre,
    public year: number,
    public director: string,
    public minutes: number,
    public reviews: Review[],
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}
}
