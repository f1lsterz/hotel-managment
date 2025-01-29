import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from "@nestjs/websockets";
import { CreateMessageDto } from "./dto/createMessageDto";
import { Server, Socket } from "socket.io";

@WebSocketGateway(3001, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
})
export class ChatGateway {
  @WebSocketServer() server: Server;

  constructor() {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage("createMessage")
  async createMessage(@MessageBody() message: string) {
    console.log("createMessage event received:", message);
  }
}
