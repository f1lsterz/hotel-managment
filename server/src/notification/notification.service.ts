import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateNotificationDto } from "./dto/createNotificationDto";
import { NotificationResponseDto } from "./dto/notificationResponseDto";
import { UpdateNotificationDto } from "./dto/updateNotificationDto";

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

  async createNotification(
    createDto: CreateNotificationDto
  ): Promise<NotificationResponseDto> {
    return this.prisma.notification.create({ data: createDto });
  }

  async getUserNotifications(
    userId: number
  ): Promise<NotificationResponseDto[]> {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }

  async updateNotification(
    id: number,
    updateDto: UpdateNotificationDto
  ): Promise<NotificationResponseDto> {
    return this.prisma.notification.update({
      where: { id },
      data: updateDto,
    });
  }

  async deleteNotificationsByIds(ids: number[]): Promise<void> {
    this.prisma.notification.deleteMany({
      where: {
        id: { in: ids },
      },
    });
  }
}
