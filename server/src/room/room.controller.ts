import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from "@nestjs/common";
import { RoomService } from "./room.service";
import { CreateRoomDto } from "./dto/createRoomDto";
import { UpdateRoomDto } from "./dto/updateRoomDto";
import { RoomFiltersDto } from "./dto/roomFiltersDto";
import { Room, RoomType } from "@prisma/client";
import { Access } from "src/common/decorators/access.decorator";
import { Roles } from "src/common/types/roles.enum";
import { RoomByIdPipe } from "src/common/pipes/RoomById";
import { RoomTypeValidationPipe } from "src/common/pipes/RoomTypeValidation";

@Controller("/rooms")
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  @Access(Roles.Admin, Roles.Receptionist)
  async createRoom(@Body() createRoomDto: CreateRoomDto): Promise<Room> {
    return await this.roomService.createRoom(createRoomDto);
  }

  @Put(":id")
  @Access(Roles.Admin, Roles.Receptionist)
  async updateRoom(
    @Param("id", RoomByIdPipe) id: number,
    @Body() updateRoomDto: UpdateRoomDto
  ): Promise<Room> {
    return await this.roomService.updateRoom(id, updateRoomDto);
  }

  @Delete(":id")
  @Access(Roles.Admin, Roles.Receptionist)
  async deleteRoom(@Param("id", RoomByIdPipe) id: number): Promise<void> {
    await this.roomService.deleteRoom(id);
  }

  @Get()
  async findAllRooms(@Query() filters: RoomFiltersDto): Promise<Room[]> {
    return await this.roomService.findAllRooms(filters);
  }

  @Get(":type")
  async findAllRoomsByTypes(
    @Param("type", RoomTypeValidationPipe) type: RoomType
  ): Promise<Room[]> {
    return await this.roomService.findAllRoomsByType(type);
  }

  @Get(":id")
  async findRoomById(@Param("id", RoomByIdPipe) id: number): Promise<Room> {
    const room = await this.roomService.findRoomById(id);
    return room;
  }

  @Get("count/available")
  async countAvailableRooms(@Query("type") type?: RoomType): Promise<number> {
    return await this.roomService.countAvailableRooms(type);
  }
}
