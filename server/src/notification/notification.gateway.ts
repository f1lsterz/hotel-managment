import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { NotificationService } from "./notification.service";
import { CreateNotificationDto } from "./dto/createNotificationDto";

@WebSocketGateway()
export class NotificationGateway {
  constructor(private readonly notificationService: NotificationService) {}

  @WebSocketServer() server;

  @SubscribeMessage("sendNotification")
  async handleSendNotification(
    @MessageBody() createDto: CreateNotificationDto
  ) {
    const notification =
      await this.notificationService.createNotification(createDto);
    this.server.emit(`notification_${createDto.userId}`, notification);
  }
}
