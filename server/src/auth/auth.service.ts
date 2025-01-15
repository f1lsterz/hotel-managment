import {
  ConflictException,
  Inject,
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
import config from "src/config/config";
import { ConfigType } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateGoogleUser(googleUser: GoogleUser): Promise<User> {
    const user = await this.userService.findByEmailOrId({
      email: googleUser.email,
    });

    if (user) return user;

    return this.userService.createUser({
      email: googleUser.email,
      name: googleUser.name,
      photoUrl: googleUser.photoURL,
      password: "",
      role: "USER",
    });
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

  async generateAccessToken(user: any): Promise<{ accessToken: string }> {
    const payload = { email: user.email, sub: user.id, role: user.role };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.secret,
      expiresIn: this.configService.signOptions.expiresIn,
    });
    return { accessToken };
  }
}
