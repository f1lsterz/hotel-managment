import { IsEmail, IsNumber, IsOptional } from "class-validator";

export class FindUserDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsOptional()
  @IsEmail()
  email?: string;
}
