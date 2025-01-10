import {
  Body,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Query,
  Controller,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { BookingService } from "./booking.service";
import { CreateBookingDto } from "./dto/createBookingDto";
import { UpdateBookingDto } from "./dto/updateBookingDto";
import { FilterBookingDto } from "./dto/filterBookingDto";
import { Access } from "src/common/decorators/access.decorator";
import { Roles } from "src/common/types/roles.enum";

@Controller("booking")
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @Access(Roles.Admin, Roles.Receptionist, Roles.User)
  async createBooking(@Body() createBookingDto: CreateBookingDto) {
    try {
      const booking = await this.bookingService.createBooking(createBookingDto);
      return { message: "Booking created", booking };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Access(Roles.Admin, Roles.Receptionist, Roles.User)
  @Get(":id")
  async getBookingById(@Param("id") id: number) {
    try {
      const booking = await this.bookingService.getBookingById(id);
      return booking;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }

  @Access(Roles.Admin, Roles.Receptionist, Roles.User)
  @Get()
  async getBookings(@Query() filterDto: FilterBookingDto) {
    try {
      const bookings = await this.bookingService.getBookings(filterDto);
      return bookings;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(":id")
  async updateBooking(
    @Param("id") id: number,
    @Body() updateBookingDto: UpdateBookingDto
  ) {
    try {
      const updateBooking = await this.bookingService.updateBooking(
        id,
        updateBookingDto
      );
      return { message: "Booking updated successfully", updateBooking };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(":id")
  async deleteBooking(@Param("id") id: number) {
    try {
      await this.bookingService.deleteBooking(id);
      return { message: "Booking deleted successfully" };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Put(":id/cancel")
  async cancelBooking(@Param("id") id: number) {
    try {
      const cancelledBooking = await this.bookingService.cancelBooking(id);
      return { message: "Booking cancelled successfully", cancelledBooking };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
