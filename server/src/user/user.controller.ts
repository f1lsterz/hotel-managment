import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { FindUserDto } from "./dto/findUserDto";
import { UpdateUserDto } from "./dto/updateUserDto";
import { Access } from "src/common/decorators/access.decorator";
import { Roles } from "src/common/types/roles.enum";
import { UserByIdPipe } from "src/common/pipes/UserById";
import { JwtAuthGuard } from "src/common/guards/jwtAuth.guard";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Access(Roles.Admin, Roles.Receptionist)
  async findAll() {
    return this.userService.findAll();
  }

  @Get("find")
  @Access(Roles.Admin, Roles.Receptionist)
  async findByEmailOrId(@Query() findUserDto: FindUserDto) {
    return this.userService.findByEmailOrId(findUserDto);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Param("id", UserByIdPipe) id: number,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(":id")
  @Access(Roles.Admin, Roles.Receptionist)
  async deleteUser(@Param("id", UserByIdPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}
