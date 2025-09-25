import { User } from 'src/auth/models/user.model';
import { Movie } from 'src/movies/models/movie.model';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Review {
  constructor(score: number, text: string, createdAt: Date, updatedAt: Date) {
    this.score = score;
    this.text = text;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @Column()
  public score: number;

  @Column()
  public text: string;

  @Column()
  public readonly createdAt: Date;

  @Column()
  public readonly updatedAt: Date;

  @ManyToOne(() => Movie, (movie) => movie.reviews)
  public readonly movie: Movie;

  @ManyToOne(() => User, (user) => user.reviews)
  public readonly author: User;
}
