import { Module } from "@nestjs/common";
import { ReviewService } from "./review.service";
import { ReviewController } from "./review.controller";
import { PrismaService } from "src/prisma.service";
import { ReviewByIdPipe } from "src/common/pipes/ReviewById";
import { UserByIdPipe } from "src/common/pipes/UserById";
import { RoomByIdPipe } from "src/common/pipes/RoomById";

@Module({
  controllers: [ReviewController],
  providers: [
    ReviewService,
    PrismaService,
    ReviewByIdPipe,
    UserByIdPipe,
    RoomByIdPipe,
  ],
})
export class ReviewModule {}
