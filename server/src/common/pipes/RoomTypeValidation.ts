import { BadRequestException, PipeTransform } from "@nestjs/common";
import { RoomType } from "@prisma/client";

export class RoomTypeValidationPipe implements PipeTransform {
  transform(value: any): RoomType {
    const validTypes = Object.values(RoomType);
    if (!validTypes.includes(value)) {
      throw new BadRequestException(
        `Invalid room type. Expected one of: ${validTypes.join(", ")}`
      );
    }

    return value as RoomType;
  }
}
