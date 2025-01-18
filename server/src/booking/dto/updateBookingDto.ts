import { IsOptional, IsInt, IsDate, IsEnum, IsNumber } from "class-validator";
import { BookingStatus } from "@prisma/client";

export class UpdateBookingDto {
  @IsOptional()
  @IsInt()
  roomId?: number;

  @IsOptional()
  @IsDate()
  checkIn?: Date;

  @IsOptional()
  @IsDate()
  checkOut?: Date;

  @IsOptional()
  @IsNumber()
  totalAmount?: number;

  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;
}
