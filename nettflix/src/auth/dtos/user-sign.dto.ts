import { IsString, IsStrongPassword } from 'class-validator';

export class UserSignDto {
  @IsString()
  readonly username: string;

  @IsStrongPassword({
    minLength: 6,
    minNumbers: 1,
    minLowercase: 1,
    minSymbols: 0,
    minUppercase: 0,
  })
  readonly password: string;
}
