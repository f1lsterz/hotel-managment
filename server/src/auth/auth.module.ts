import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PrismaService } from "src/prisma.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import { JwtStrategy } from "src/common/strategies/jwtStrategy";
import { UserByIdPipe } from "src/common/pipes/UserById";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || "hotel_to_hotel",
      signOptions: { expiresIn: "1d" },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    JwtStrategy,
    PrismaService,
    UserByIdPipe,
  ],
})
export class AuthModule {}
