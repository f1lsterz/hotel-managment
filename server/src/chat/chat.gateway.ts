import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from "@nestjs/websockets";
import { ChatService } from "./chat.service";
import { CreateMessageDto } from "./dto/createMessageDto";
import { UpdateMessageDto } from "./dto/updateMessageDto";

@WebSocketGateway(Number(process.env.SOCKET_PORT) || 3001, {
  cors: { origin: process.env.SOCKET_API || "http://localhost:3001" },
})
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage("createMessage")
  async create(@MessageBody() createMessageDto: CreateMessageDto) {
    return await this.chatService.createMessage(createMessageDto);
  }

  @SubscribeMessage("findAllMessages")
  async findAll() {
    return await this.chatService.findAllMessages();
  }

  @SubscribeMessage("updateMessage")
  async update(@MessageBody() updateMessageDto: UpdateMessageDto) {
    return await this.chatService.updateMessage(updateMessageDto);
  }

  @SubscribeMessage("deleteMessage")
  async delete(@MessageBody() id: number) {
    return await this.chatService.deleteMessage(id);
  }
}
