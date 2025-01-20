import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { Response, Request } from "express";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/loginDto";
import { RegistrationDto } from "./dto/registrationDto";
import { GoogleOAuthGuard } from "src/common/guards/googleOAuth.guard";
import { JwtAuthGuard } from "src/common/guards/jwtAuth.guard";

@Controller("/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<{ message: string }> {
    const { accessToken } = await this.authService.login(loginDto);
    console.log(accessToken);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return { message: "Login successful" };
  }

  @Post("registration")
  async registration(
    @Body() registrationDto: RegistrationDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<{ message: string }> {
    const { accessToken } =
      await this.authService.registration(registrationDto);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return { message: "Registration successful" };
  }

  @Get("google")
  @UseGuards(GoogleOAuthGuard)
  googleLogin(): void {}

  @Get("google/callback")
  @UseGuards(GoogleOAuthGuard)
  async googleCallBack(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ): Promise<{ message: string }> {
    const user = req.user;
    const accessToken = this.authService.generateAccessToken(user);
    console.log(accessToken);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return { message: "Google login successful" };
  }

  @Post("logout")
  @UseGuards(JwtAuthGuard)
  async logout(
    @Res({ passthrough: true }) res: Response
  ): Promise<{ message: string }> {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return { message: "Logout successful" };
  }
}
