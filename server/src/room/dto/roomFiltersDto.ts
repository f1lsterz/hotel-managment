import { IsEnum, IsOptional, IsBoolean, IsNumber } from "class-validator";
import { RoomType, RoomStatus } from "@prisma/client";

export class RoomFiltersDto {
  @IsEnum(RoomType)
  @IsOptional()
  type?: RoomType;

  @IsEnum(RoomStatus)
  @IsOptional()
  status?: RoomStatus;

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;

  @IsNumber()
  @IsOptional()
  priceMin?: number;

  @IsNumber()
  @IsOptional()
  priceMax?: number;
}
