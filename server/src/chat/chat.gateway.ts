import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from "@nestjs/websockets";
import { ChatService } from "./chat.service";
import { CreateMessageDto } from "./dto/createMessageDto";
import { UpdateMessageDto } from "./dto/updateMessageDto";
import { Server } from "socket.io";

@WebSocketGateway(Number(process.env.CHAT_PORT) || 3001, {
  cors: {
    origin:
      process.env.SERVER_URL + process.env.CHAT_PORT || "http://localhost:3001",
  },
})
export class ChatGateway {
  @WebSocketServer() server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage("createMessage")
  async createMessage(@MessageBody() createMessageDto: CreateMessageDto) {
    const message = await this.chatService.createMessage(createMessageDto);

    this.server.emit("newMessage", message);

    return message;
  }

  @SubscribeMessage("findAllMessages")
  async findAllMessages() {
    const messages = await this.chatService.findAllMessages();
    return messages;
  }

  @SubscribeMessage("updateMessage")
  async updateMessage(@MessageBody() updateMessageDto: UpdateMessageDto) {
    const updatedMessage =
      await this.chatService.updateMessage(updateMessageDto);
    this.server.emit("messageUpdated", updatedMessage);
    return updatedMessage;
  }

  @SubscribeMessage("deleteMessage")
  async delete(@MessageBody() id: number) {
    return await this.chatService.deleteMessage(id);
  }
}
