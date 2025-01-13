import { Injectable, NotFoundException, PipeTransform } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";

@Injectable()
export class EntityByIdPipe implements PipeTransform<number, Promise<number>> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly entityName: string
  ) {}

  async transform(id: number): Promise<number> {
    const entity = await this.prisma[this.entityName].findUnique({
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException(`${this.entityName} with ID ${id} not found`);
    }

    return id;
  }
}
