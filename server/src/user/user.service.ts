import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateUserDto } from "./dto/createUserDto";
import { UpdateUserDto } from "./dto/updateUserDto";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    try {
      return await this.prisma.user.findUnique({ where: { email } });
    } catch (error) {
      throw new InternalServerErrorException("Error fetching user by email");
    }
  }

  async findById(id: number) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) {
        throw new NotFoundException("User not found");
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException("Error fetching user data");
    }
  }

  async findAll() {
    try {
      return await this.prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException("Error fetching all users");
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    const { email, password, name, role } = createUserDto;
    try {
      return await this.prisma.user.create({
        data: { email, password, name, role },
      });
    } catch (error) {
      throw new InternalServerErrorException("Error creating user");
    }
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.findById(id);

      const { name, photoUrl } = updateUserDto;

      return await this.prisma.user.update({
        where: { id },
        data: { name, photoUrl },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException("Error updating user");
    }
  }

  async deleteUser(id: number) {
    try {
      await this.findById(id);
      return await this.prisma.user.delete({ where: { id } });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException("Error deleting user");
    }
  }
}
