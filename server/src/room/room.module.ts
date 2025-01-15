import { Module } from "@nestjs/common";
import { RoomService } from "./room.service";
import { RoomController } from "./room.controller";
import { PrismaService } from "src/prisma.service";
import { RoomByIdPipe } from "src/common/pipes/RoomById";

@Module({
  controllers: [RoomController],
  providers: [RoomService, PrismaService, RoomByIdPipe],
})
export class RoomModule {}
