import { Injectable } from "@nestjs/common";
import { CreateMessageDto } from "./dto/createMessageDto";
import { PrismaService } from "src/prisma.service";
import { UpdateMessageDto } from "./dto/updateMessageDto";

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async createMessage(createMessageDto: CreateMessageDto) {
    const { senderId, content } = createMessageDto;
    return this.prisma.message.create({
      data: {
        senderId,
        content,
      },
    });
  }

  async findAllMessages() {
    return this.prisma.message.findMany({
      include: {
        sender: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async updateMessage(updateMessageDto: UpdateMessageDto) {
    const { id, content } = updateMessageDto;
    return await this.prisma.message.update({
      where: { id },
      data: { content },
    });
  }

  async deleteMessage(id: number) {
    return this.prisma.message.delete({
      where: { id },
    });
  }
}
