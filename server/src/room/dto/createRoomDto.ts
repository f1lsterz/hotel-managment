import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsObject,
} from "class-validator";
import { RoomType } from "@prisma/client";

export class CreateRoomDto {
  @IsNotEmpty()
  @IsNumber()
  number: number;

  @IsEnum(RoomType)
  @IsNotEmpty()
  type: RoomType;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;

  @IsObject()
  @IsOptional()
  features?: object;
}
