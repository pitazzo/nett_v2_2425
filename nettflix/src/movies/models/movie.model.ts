export enum Genre {
  COMEDY = 'comedy',
  DRAMA = 'drama',
  FANTASY = 'fantasy',
  ANIME = 'anime',
}

export class Movie {
  constructor(
    readonly id: string,
    public title: string,
    public genre: Genre,
    public year: number,
    public director: string,
    public minutes: number,
  ) {}
}
