import { Review } from 'src/movies/models/review.model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ unique: true })
  readonly username: string;

  @Column()
  readonly hashedPassword: string;

  @Column()
  readonly createdAt: Date;

  @OneToMany(() => Review, (review) => review.author)
  readonly reviews: Review[];
}
