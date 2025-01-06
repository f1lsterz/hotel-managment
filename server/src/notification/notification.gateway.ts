import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { NotificationService } from "./notification.service";
import { CreateNotificationDto } from "./dto/createNotificationDto";
import { Server } from "socket.io";

@WebSocketGateway(Number(process.env.NOTIFICATION_PORT) || 3002, {
  cors: {
    origin:
      process.env.SERVER_URL + process.env.NOTIFICATION_PORT ||
      "http://localhost:3002",
  },
})
export class NotificationGateway {
  constructor(private readonly notificationService: NotificationService) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage("sendNotification")
  async handleSendNotification(
    @MessageBody() createDto: CreateNotificationDto
  ) {
    const notification =
      await this.notificationService.createNotification(createDto);
    this.server.emit(`notification_${createDto.userId}`, notification);
  }
}
