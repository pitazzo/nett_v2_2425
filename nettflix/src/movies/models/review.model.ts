export class Review {
  constructor(
    public readonly id: string,
    public score: number,
    public text: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
