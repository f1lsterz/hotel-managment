import {
  IsString,
  IsOptional,
  IsInt,
  IsDateString,
  Min,
  Max,
} from "class-validator";

export class CreateDiscountDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  @Min(0)
  @Max(100)
  percentage: number;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;
}
