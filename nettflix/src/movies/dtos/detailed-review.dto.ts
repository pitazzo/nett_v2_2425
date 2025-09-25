import { Review } from 'src/movies/models/review.model';

export class DetailedReviewDto {
  constructor(
    public readonly id: string,
    public readonly author: string,
    public readonly score: number,
    public readonly text: string,
  ) {}

  static fromModel(review: Review) {
    return new DetailedReviewDto(
      review.id,
      review.author.username,
      review.score,
      review.text,
    );
  }
}
