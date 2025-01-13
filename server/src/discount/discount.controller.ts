import {
  Controller,
  Put,
  Get,
  Post,
  Delete,
  Param,
  Body,
} from "@nestjs/common";
import { DiscountService } from "./discount.service";
import { UpdateDiscountDto } from "./dto/updateDiscountDto";
import { CreateDiscountDto } from "./dto/createDiscountDto";
import { Roles } from "src/common/types/roles.enum";
import { Access } from "src/common/decorators/access.decorator";
import { DiscountByIdPipe } from "src/common/pipes/DiscountById";

@Controller("discount")
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Post()
  @Access(Roles.Admin, Roles.Receptionist)
  async createDiscount(@Body() createDiscountDto: CreateDiscountDto) {
    const discount =
      await this.discountService.createDiscount(createDiscountDto);
    return discount;
  }

  @Put(":id")
  @Access(Roles.Admin, Roles.Receptionist)
  async updateDiscount(
    @Param("id", DiscountByIdPipe) id: number,
    @Body() updateDiscountDto: UpdateDiscountDto
  ) {
    const updatedDiscount = await this.discountService.updateDiscount(
      id,
      updateDiscountDto
    );
    return updatedDiscount;
  }

  @Get()
  async getAllDiscounts() {
    const discounts = await this.discountService.getAllDiscounts();
    return discounts;
  }

  @Get("room/:roomId")
  async getDiscountsForRoom(@Param("roomId") roomId: number) {
    const discounts = await this.discountService.getDiscountsForRoom(roomId);
    return discounts;
  }

  @Put("deactivate/:id")
  @Access(Roles.Admin, Roles.Receptionist)
  async deactivateDiscount(@Param("id", DiscountByIdPipe) id: number) {
    const deactivatedDiscount =
      await this.discountService.deactivateDiscount(id);
    return deactivatedDiscount;
  }

  @Delete(":id")
  @Access(Roles.Admin, Roles.Receptionist)
  async deleteDiscount(@Param("id", DiscountByIdPipe) id: number) {
    await this.discountService.deleteDiscount(id);
    return { message: "Discount deleted successfully" };
  }
}
