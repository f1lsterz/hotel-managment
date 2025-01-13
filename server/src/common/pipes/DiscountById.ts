import { Injectable } from "@nestjs/common";
import { EntityByIdPipe } from "./EntityById";
import { PrismaService } from "../../prisma.service";

@Injectable()
export class DiscountByIdPipe extends EntityByIdPipe {
  constructor(prisma: PrismaService) {
    super(prisma, "discount");
  }
}
