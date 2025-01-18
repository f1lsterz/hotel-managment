import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "src/common/strategies/jwt.strategy";
import { UserByIdPipe } from "src/common/pipes/UserById";
import { UserModule } from "src/user/user.module";
import { GoogleStrategy } from "src/common/strategies/google.strategy";
import config from "src/config/config";
import { GoogleOAuthGuard } from "src/common/guards/googleOAuth.guard";
import { JwtAuthGuard } from "src/common/guards/jwtAuth.guard";
import { RolesGuard } from "src/common/guards/role.guard";

@Module({
  imports: [
    JwtModule.registerAsync(config.asProvider()),
    UserModule,
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    GoogleStrategy,
    UserByIdPipe,
    GoogleOAuthGuard,
    JwtAuthGuard,
    RolesGuard,
  ],
  exports: [
    AuthService,
    GoogleOAuthGuard,
    JwtAuthGuard,
    GoogleStrategy,
    RolesGuard,
    JwtModule,
  ],
})
export class AuthModule {}
