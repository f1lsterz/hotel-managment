import { NotificationType } from "@prisma/client";

export class CreateNotificationDto {
  userId: number;
  message: string;
  type: NotificationType;
}
