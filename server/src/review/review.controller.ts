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
import { Roles } from "src/common/types/roles.enum";
import { Access } from "src/common/decorators/access.decorator";

@Controller("review")
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @Access(Roles.Admin, Roles.Receptionist, Roles.User)
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
  @Access(Roles.Admin, Roles.Receptionist, Roles.User)
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
  @Access(Roles.Admin, Roles.Receptionist, Roles.User)
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
  @Access(Roles.Admin, Roles.Receptionist, Roles.User)
  async deleteReview(@Param("id") id: number) {
    try {
      await this.reviewService.deleteReview(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
