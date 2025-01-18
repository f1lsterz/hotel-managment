import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { PrismaService } from "src/prisma.service";
import { UserByIdPipe } from "src/common/pipes/UserById";

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, UserByIdPipe],
  exports: [UserService, PrismaService],
})
export class UserModule {}
