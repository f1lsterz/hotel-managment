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
import { RoomByIdPipe } from "src/common/pipes/RoomById";
import { UserByIdPipe } from "src/common/pipes/UserById";
import { ReviewByIdPipe } from "src/common/pipes/ReviewById";

@Controller("review")
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @Access(Roles.Admin, Roles.Receptionist, Roles.User)
  async createReview(@Body() createReviewDto: CreateReviewDto) {
    const review = await this.reviewService.createReview(createReviewDto);
    return review;
  }

  @Get("room/:roomId")
  async getReviewsForRoom(@Param("roomId", RoomByIdPipe) roomId: number) {
    const reviews = await this.reviewService.getReviewsForRoom(roomId);
    return reviews;
  }

  @Get("user/:userId")
  @Access(Roles.Admin, Roles.Receptionist, Roles.User)
  async getReviewsForUser(@Param("userId", UserByIdPipe) userId: number) {
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
    @Param("id", ReviewByIdPipe) id: number,
    @Body() updateReviewDto: UpdateReviewDto
  ) {
    const updatedReview = await this.reviewService.updateReview(
      id,
      updateReviewDto
    );
    return updatedReview;
  }

  @Delete(":id")
  @Access(Roles.Admin, Roles.Receptionist, Roles.User)
  async deleteReview(@Param("id", ReviewByIdPipe) id: number) {
    try {
      await this.reviewService.deleteReview(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
