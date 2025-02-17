import { IsNotEmpty, IsPositive, IsDate, IsInt } from "class-validator";

export class CreateBookingDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  roomId: number;

  @IsDate()
  @IsNotEmpty()
  checkIn: Date;

  @IsDate()
  @IsNotEmpty()
  checkOut: Date;

  @IsPositive()
  @IsNotEmpty()
  totalAmount: number;
}
