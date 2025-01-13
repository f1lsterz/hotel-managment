import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import { EntityByIdPipe } from "./EntityById";

@Injectable()
export class RoomByIdPipe extends EntityByIdPipe {
  constructor(prisma: PrismaService) {
    super(prisma, "room");
  }
}
