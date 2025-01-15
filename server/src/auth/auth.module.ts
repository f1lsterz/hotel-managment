import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "src/common/strategies/jwt.strategy";
import { UserByIdPipe } from "src/common/pipes/UserById";
import { UserModule } from "src/user/user.module";
import { GoogleStrategy } from "src/common/strategies/google.strategy";

@Module({
  imports: [UserModule, PassportModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, GoogleStrategy, UserByIdPipe],
})
export class AuthModule {}
