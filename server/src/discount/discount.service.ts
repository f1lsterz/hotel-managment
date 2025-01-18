import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Discount } from "@prisma/client";
import { CreateDiscountDto } from "./dto/createDiscountDto";
import { UpdateDiscountDto } from "./dto/updateDiscountDto";

@Injectable()
export class DiscountService {
  constructor(private readonly prisma: PrismaService) {}

  async createDiscount(
    createDiscountDto: CreateDiscountDto
  ): Promise<Discount> {
    const { name, description, percentage, startDate, endDate } =
      createDiscountDto;

    const discount = await this.prisma.discount.create({
      data: {
        name,
        description,
        percentage,
        startDate,
        endDate,
      },
    });

    return discount;
  }

  async updateDiscount(
    id: number,
    updateDiscountDto: UpdateDiscountDto
  ): Promise<Discount> {
    const { name, description, percentage, startDate, endDate, isActive } =
      updateDiscountDto;

    const discount = await this.prisma.discount.findUnique({
      where: { id },
    });

    if (!discount) {
      throw new Error("Discount not found");
    }

    const updatedDiscount = await this.prisma.discount.update({
      where: { id },
      data: {
        name,
        description,
        percentage,
        startDate,
        endDate,
        isActive,
      },
    });

    return updatedDiscount;
  }

  async getAllDiscounts(): Promise<Discount[]> {
    const discounts = await this.prisma.discount.findMany({
      where: {
        isActive: true,
      },
    });

    return discounts;
  }

  async getDiscountsForRoom(roomId: number): Promise<Discount[]> {
    const discounts = await this.prisma.roomDiscount.findMany({
      where: { roomId },
      include: { discount: true },
    });

    return discounts.map((roomDiscount) => roomDiscount.discount);
  }

  async deactivateDiscount(id: number): Promise<Discount> {
    const discount = await this.prisma.discount.findUnique({
      where: { id },
    });

    if (!discount) {
      throw new Error("Discount not found");
    }

    const deactivatedDiscount = await this.prisma.discount.update({
      where: { id },
      data: { isActive: false },
    });

    return deactivatedDiscount;
  }

  async deleteDiscount(id: number): Promise<void> {
    const discount = await this.prisma.discount.findUnique({
      where: { id },
    });

    if (!discount) {
      throw new Error("Discount not found");
    }

    await this.prisma.discount.delete({
      where: { id },
    });
  }

  async getDiscountsByDate(date: Date): Promise<Discount[]> {
    const discounts = await this.prisma.discount.findMany({
      where: {
        startDate: { lte: date },
        endDate: { gte: date },
        isActive: true,
      },
    });

    return discounts;
  }
}
