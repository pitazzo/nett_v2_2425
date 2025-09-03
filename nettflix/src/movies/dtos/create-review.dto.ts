import {
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateReviewDto {
  @IsNumber()
  @Min(0)
  @Max(10)
  score: number;

  @IsString()
  @MinLength(5)
  @MaxLength(200)
  text: string;
}
