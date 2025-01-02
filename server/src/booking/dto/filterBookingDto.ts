import { BookingStatus } from "@prisma/client";
import { IsOptional, IsInt, IsEnum, IsDate } from "class-validator";

export class FilterBookingDto {
  @IsOptional()
  @IsInt()
  userId?: number;

  @IsOptional()
  @IsInt()
  roomId?: number;

  @IsOptional()
  @IsInt()
  checkIn?: Date;

  @IsOptional()
  @IsDate()
  checkOut?: Date;

  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;
}
