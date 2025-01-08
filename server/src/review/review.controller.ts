import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { ReviewService } from "./review.service";
import { CreateReviewDto } from "./dto/createReviewDto";
import { UpdateReviewDto } from "./dto/updateReviewDto";

@Controller("review")
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  async createReview(@Body() createReviewDto: CreateReviewDto) {
    try {
      const review = await this.reviewService.createReview(createReviewDto);
      return review;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get("room/:roomId")
  async getReviewsForRoom(@Param("roomId") roomId: number) {
    const reviews = await this.reviewService.getReviewsForRoom(roomId);
    return reviews;
  }

  @Get("user/:userId")
  async getReviewsForUser(@Param("userId") userId: number) {
    const reviews = await this.reviewService.getReviewsForUser(userId);
    return reviews;
  }

  @Get()
  async getAllReviews() {
    const reviews = await this.reviewService.getAllReviews();
    return reviews;
  }

  @Patch(":id")
  async updateReview(
    @Param("id") id: number,
    @Body() updateReviewDto: UpdateReviewDto
  ) {
    try {
      const updatedReview = await this.reviewService.updateReview(
        id,
        updateReviewDto
      );
      return updatedReview;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Delete(":id")
  async deleteReview(@Param("id") id: number) {
    try {
      await this.reviewService.deleteReview(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
