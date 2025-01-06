import {
  Controller,
  Put,
  Get,
  Post,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { DiscountService } from "./discount.service";
import { UpdateDiscountDto } from "./dto/updateDiscountDto";
import { CreateDiscountDto } from "./dto/createDiscountDto";

@Controller("discount")
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Post()
  async createDiscount(@Body() createDiscountDto: CreateDiscountDto) {
    try {
      const discount =
        await this.discountService.createDiscount(createDiscountDto);
      return discount;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(":id")
  async updateDiscount(
    @Param("id") id: number,
    @Body() updateDiscountDto: UpdateDiscountDto
  ) {
    try {
      const updatedDiscount = await this.discountService.updateDiscount(
        id,
        updateDiscountDto
      );
      return updatedDiscount;
    } catch (error) {
      throw new HttpException(
        `Error updating discount: ${error.message}`,
        HttpStatus.NOT_FOUND
      );
    }
  }

  @Get()
  async getAllDiscounts() {
    try {
      const discounts = await this.discountService.getAllDiscounts();
      return discounts;
    } catch (error) {
      throw new HttpException(
        `Error fetching discounts: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get("room/:roomId")
  async getDiscountsForRoom(@Param("roomId") roomId: number) {
    try {
      const discounts = await this.discountService.getDiscountsForRoom(roomId);
      return discounts;
    } catch (error) {
      throw new HttpException(
        `Error fetching discounts for room: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Put("deactivate/:id")
  async deactivateDiscount(@Param("id") id: number) {
    try {
      const deactivatedDiscount =
        await this.discountService.deactivateDiscount(id);
      return deactivatedDiscount;
    } catch (error) {
      throw new HttpException(
        `Error deactivating discount: ${error.message}`,
        HttpStatus.NOT_FOUND
      );
    }
  }

  @Delete(":id")
  async deleteDiscount(@Param("id") id: number) {
    try {
      await this.discountService.deleteDiscount(id);
      return { message: "Discount deleted successfully" };
    } catch (error) {
      throw new HttpException(
        `Error deleting discount: ${error.message}`,
        HttpStatus.NOT_FOUND
      );
    }
  }
}
