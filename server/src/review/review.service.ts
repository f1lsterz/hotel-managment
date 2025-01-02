import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateReviewDto } from "./dto/createReviewDto";
import { UpdateReviewDto } from "./dto/updateReviewDto";
import { Review } from "@prisma/client";

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService) {}

  async createReview(createReviewDto: CreateReviewDto): Promise<Review> {
    const { userId, roomId, rating, comment } = createReviewDto;

    const bookingExists = await this.prisma.booking.findFirst({
      where: { userId, roomId, status: "CONFIRMED" },
    });

    if (!bookingExists) {
      throw new Error("No confirmed booking found for this room and user.");
    }

    const review = await this.prisma.review.create({
      data: {
        userId,
        roomId,
        rating,
        comment,
      },
    });

    return review;
  }

  async getReviewsForRoom(roomId: number): Promise<Review[]> {
    const reviews = await this.prisma.review.findMany({
      where: { roomId },
      orderBy: { createdAt: "desc" },
    });

    return reviews;
  }

  async updateReview(
    id: number,
    updateReviewDto: UpdateReviewDto
  ): Promise<Review> {
    const { rating, comment } = updateReviewDto;

    const review = await this.prisma.review.findUnique({
      where: { id },
    });

    if (!review) {
      throw new Error("Review not found.");
    }

    const updatedReview = await this.prisma.review.update({
      where: { id },
      data: { rating, comment },
    });

    return updatedReview;
  }

  async deleteReview(id: number): Promise<void> {
    const review = await this.prisma.review.findUnique({
      where: { id },
    });

    if (!review) {
      throw new Error("Review not found.");
    }

    await this.prisma.review.delete({
      where: { id },
    });
  }

  async getReviewsForUser(userId: number): Promise<Review[]> {
    const reviews = await this.prisma.review.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return reviews;
  }

  async getAllReviews(): Promise<Review[]> {
    const reviews = await this.prisma.review.findMany({
      orderBy: { createdAt: "desc" },
    });

    return reviews;
  }
}
