import {
  IsEnum,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsObject,
} from "class-validator";
import { RoomStatus, RoomType } from "@prisma/client";

export class UpdateRoomDto {
  @IsEnum(RoomType)
  @IsOptional()
  type?: RoomType;

  @IsEnum(RoomStatus)
  @IsOptional()
  status?: RoomStatus;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;

  @IsObject()
  @IsOptional()
  features?: object;
}
