import {
  Body,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Query,
  Controller,
  UseGuards,
} from "@nestjs/common";
import { BookingService } from "./booking.service";
import { CreateBookingDto } from "./dto/createBookingDto";
import { UpdateBookingDto } from "./dto/updateBookingDto";
import { FilterBookingDto } from "./dto/filterBookingDto";
import { Access } from "src/common/decorators/access.decorator";
import { Roles } from "src/common/types/roles.enum";
import { BookingByIdPipe } from "src/common/pipes/BookingById";
import { JwtAuthGuard } from "src/common/guards/jwtAuth.guard";

@Controller("booking")
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createBooking(@Body() createBookingDto: CreateBookingDto) {
    const booking = await this.bookingService.createBooking(createBookingDto);
    return booking;
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  async getBookingById(@Param("id", BookingByIdPipe) id: number) {
    return this.bookingService.getBookingById(id);
  }

  @Get()
  @Access(Roles.Admin, Roles.Receptionist)
  async getBookings(@Query() filterDto: FilterBookingDto) {
    const bookings = await this.bookingService.getBookings(filterDto);
    return bookings;
  }

  @Put(":id")
  @Access(Roles.Admin, Roles.Receptionist)
  async updateBooking(
    @Param("id", BookingByIdPipe) id: number,
    @Body() updateBookingDto: UpdateBookingDto
  ) {
    const updateBooking = await this.bookingService.updateBooking(
      id,
      updateBookingDto
    );
    return { message: "Booking updated successfully", updateBooking };
  }

  @Delete(":id")
  @Access(Roles.Admin, Roles.Receptionist)
  async deleteBooking(@Param("id", BookingByIdPipe) id: number) {
    await this.bookingService.deleteBooking(id);
    return { message: "Booking deleted successfully" };
  }

  @Put(":id/cancel")
  @UseGuards(JwtAuthGuard)
  async cancelBooking(@Param("id", BookingByIdPipe) id: number) {
    const cancelledBooking = await this.bookingService.cancelBooking(id);
    return { message: "Booking cancelled successfully", cancelledBooking };
  }
}
