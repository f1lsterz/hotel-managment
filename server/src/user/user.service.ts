import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateUserDto } from "./dto/createUserDto";
import { UpdateUserDto } from "./dto/updateUserDto";
import { FindUserDto } from "./dto/findUserDto";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmailOrId(findUserDto: FindUserDto) {
    const { id, email } = findUserDto;

    if (!id && !email) {
      throw new BadRequestException();
    }

    const user = id
      ? await this.prisma.user.findUnique({ where: { id } })
      : await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    if (!users) {
      throw new InternalServerErrorException("Error fetching all users");
    }

    return users;
  }

  async createUser(createUserDto: CreateUserDto) {
    const { email, password, name, role, photoUrl } = createUserDto;

    const user = await this.prisma.user.create({
      data: { email, password, name, role, photoUrl },
    });

    if (!user) {
      throw new InternalServerErrorException("Error creating user");
    }

    return user;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findByEmailOrId({ id });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const { name, photoUrl } = updateUserDto;

    return await this.prisma.user.update({
      where: { id },
      data: { name, photoUrl },
    });
  }

  async deleteUser(id: number) {
    await this.findByEmailOrId({ id });

    return await this.prisma.user.delete({ where: { id } });
  }
}
