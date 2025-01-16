import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/loginDto";
import { RegistrationDto } from "./dto/registrationDto";
import { GoogleOAuthGuard } from "src/common/guards/googleOAuth.guard";
import { Request } from "express";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post("registration")
  async registration(@Body() registrationDto: RegistrationDto) {
    return this.authService.registration(registrationDto);
  }

  @Get("google")
  @UseGuards(GoogleOAuthGuard)
  googleLogin(): void {}

  @Get("google/callback")
  @UseGuards(GoogleOAuthGuard)
  async googleCallBack(@Req() req: Request): Promise<{ accessToken: string }> {
    const user = req.user;
    return this.authService.generateAccessToken(user);
  }
}
