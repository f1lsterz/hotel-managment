import { NotificationType } from "@prisma/client";

export class NotificationResponseDto {
  id: number;
  userId: number;
  message: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: Date;
}
