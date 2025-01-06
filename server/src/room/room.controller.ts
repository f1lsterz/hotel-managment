import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpException,
  HttpStatus,
  ParseIntPipe,
} from "@nestjs/common";
import { RoomService } from "./room.service";
import { CreateRoomDto } from "./dto/createRoomDto";
import { UpdateRoomDto } from "./dto/updateRoomDto";
import { RoomFiltersDto } from "./dto/roomFiltersDto";
import { Room, RoomType } from "@prisma/client";

@Controller("room")
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  async createRoom(@Body() createRoomDto: CreateRoomDto): Promise<Room> {
    try {
      return await this.roomService.createRoom(createRoomDto);
    } catch (error) {
      throw new HttpException(
        `Error creating room: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Put(":id")
  async updateRoom(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateRoomDto: UpdateRoomDto
  ): Promise<Room> {
    try {
      return await this.roomService.updateRoom(id, updateRoomDto);
    } catch (error) {
      if (error.code === "P2025") {
        throw new HttpException("Room not found", HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        `Error updating room: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete(":id")
  async deleteRoom(@Param("id", ParseIntPipe) id: number): Promise<void> {
    try {
      await this.roomService.deleteRoom(id);
    } catch (error) {
      if (error.code === "P2025") {
        throw new HttpException("Room not found", HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        `Error deleting room: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get()
  async findAllRooms(@Query() filters: RoomFiltersDto): Promise<Room[]> {
    try {
      return await this.roomService.findAllRooms(filters);
    } catch (error) {
      throw new HttpException(
        `Error fetching rooms: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(":id")
  async findRoomById(@Param("id", ParseIntPipe) id: number): Promise<Room> {
    try {
      const room = await this.roomService.findRoomById(id);
      if (!room) {
        throw new HttpException("Room not found", HttpStatus.NOT_FOUND);
      }
      return room;
    } catch (error) {
      throw new HttpException(
        `Error fetching room: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get("count/available")
  async countAvailableRooms(@Query("type") type?: RoomType): Promise<number> {
    try {
      return await this.roomService.countAvailableRooms(type);
    } catch (error) {
      throw new HttpException(
        `Error counting available rooms: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
