export class Movie {
  readonly id: string;
  title: string;
  genre: 'comedy' | 'drama' | 'fantasy';
  year: number;
  director: string;
  minutes: number;
}
