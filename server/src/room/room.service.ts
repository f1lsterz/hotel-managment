import { Injectable } from "@nestjs/common";
import { Room, RoomType } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { CreateRoomDto } from "./dto/createRoomDto";
import { UpdateRoomDto } from "./dto/updateRoomDto";
import { RoomFiltersDto } from "./dto/roomFiltersDto";

@Injectable()
export class RoomService {
  constructor(private readonly prisma: PrismaService) {}

  async createRoom(createRoomDto: CreateRoomDto): Promise<Room> {
    return this.prisma.room.create({
      data: {
        ...createRoomDto,
        status: "AVAILABLE",
      },
    });
  }

  async updateRoom(id: number, updateRoomDto: UpdateRoomDto): Promise<Room> {
    return this.prisma.room.update({ where: { id }, data: updateRoomDto });
  }

  async deleteRoom(id: number): Promise<void> {
    await this.prisma.room.delete({ where: { id } });
  }

  async findAllRooms(filters: RoomFiltersDto): Promise<Room[]> {
    return this.prisma.room.findMany({ where: filters });
  }

  async findRoomById(id: number): Promise<Room> {
    return this.prisma.room.findUnique({ where: { id } });
  }

  async countAvailableRooms(type?: RoomType): Promise<number> {
    const where: any = { isAvailable: true };

    if (type) {
      where.type = type;
    }

    return this.prisma.room.count({ where });
  }
}
