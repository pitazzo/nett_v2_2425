import { Review } from 'src/movies/models/review.model';

export class ReviewDto {
  constructor(
    public readonly score: number,
    public readonly text: string,
  ) {}

  static fromModel(review: Review) {
    return new ReviewDto(review.score, review.text);
  }
}
