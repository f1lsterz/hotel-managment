import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import bcrypt from "bcrypt";
import { LoginDto } from "./dto/loginDto";
import { RegistrationDto } from "./dto/registrationDto";
import { GoogleUser } from "src/common/types/googleUser";
import { User } from "@prisma/client";

@Injectable()
export class AuthService {
  async validateGoogleUser(googleUser: GoogleUser): Promise<User> {
    const user = await this..findByEmail(googleUser.email);
    if (user) return user;

    return this.userRepository.create(googleUser);
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;
    const user = await this.userService.findByEmailOrId({ email });

    if (!user || !(await this.validatePassword(password, user.password))) {
      throw new UnauthorizedException("Invalid email or password");
    }

    return this.generateAccessToken(user);
  }

  async registration(
    registrationDto: RegistrationDto
  ): Promise<{ accessToken: string }> {
    const { email, password, name, role } = registrationDto;

    const existingUser = await this.userService.findByEmailOrId({ email });
    if (existingUser) {
      throw new ConflictException("Email is already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userService.createUser({
      email,
      password: hashedPassword,
      name,
      role,
    });

    return this.generateAccessToken(newUser);
  }

  private async validatePassword(
    password: string,
    userPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, userPassword);
  }

  private async generateAccessToken(user: any): { accessToken: string } {
    const payload = { email: user.email, sub: user.id, role: user.role };
    const accessToken = this.jwtService.signAsync(payload);
    return { accessToken };
  }
}
