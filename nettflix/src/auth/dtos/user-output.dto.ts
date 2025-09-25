import { User } from 'src/auth/models/user.model';

export class UserOutputDto {
  constructor(
    readonly id: string,
    readonly username: string,
    readonly createdAt: Date,
  ) {}

  static fromEntity(user: User): UserOutputDto {
    return new UserOutputDto(user.id, user.username, user.createdAt);
  }
}
