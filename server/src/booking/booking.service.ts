import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateBookingDto } from "./dto/createBookingDto";
import { FilterBookingDto } from "./dto/filterBookingDto";
import { UpdateBookingDto } from "./dto/updateBookingDto";
import { Booking, BookingStatus } from "@prisma/client";

@Injectable()
export class BookingService {
  constructor(private readonly prisma: PrismaService) {}

  async createBooking(createBookingDto: CreateBookingDto): Promise<Booking> {
    const { userId, roomId, checkIn, checkOut, totalAmount, serviceIds } =
      createBookingDto;

    const isAvailable = await this.checkRoomAvailability(
      roomId,
      checkIn,
      checkOut
    );
    if (!isAvailable) {
      throw new Error("Room is not available for the selected dates.");
    }

    const booking = await this.prisma.booking.create({
      data: {
        userId,
        roomId,
        checkIn,
        checkOut,
        totalAmount,
        status: BookingStatus.PENDING,
        services: {
          create: serviceIds?.map((serviceId) => ({ serviceId })) || [],
        },
      },
      include: { services: true },
    });

    return booking;
  }

  async getBookingById(id: number): Promise<Booking> {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: { services: true },
    });
    if (!booking) {
      throw new Error("Booking not found.");
    }
    return booking;
  }

  async getBookings(filterDto: FilterBookingDto): Promise<Booking[]> {
    const { userId, roomId, checkIn, checkOut, status } = filterDto;

    const bookings = await this.prisma.booking.findMany({
      where: {
        userId,
        roomId,
        status,
        checkIn: checkIn ? { gte: checkIn } : undefined,
        checkOut: checkOut ? { lte: checkOut } : undefined,
      },
      include: { services: true },
    });

    return bookings;
  }

  async updateBooking(
    id: number,
    updateBookingDto: UpdateBookingDto
  ): Promise<Booking> {
    const existingBooking = await this.getBookingById(id);

    const { roomId, checkIn, checkOut, totalAmount, status, serviceIds } =
      updateBookingDto;

    if (roomId || checkIn || checkOut) {
      const isAvailable = await this.checkRoomAvailability(
        roomId || existingBooking.roomId,
        checkIn || existingBooking.checkIn,
        checkOut || existingBooking.checkOut
      );

      if (!isAvailable) {
        throw new Error("Room is not available for the updated dates.");
      }
    }

    const updatedBooking = await this.prisma.booking.update({
      where: { id },
      data: {
        roomId,
        checkIn,
        checkOut,
        totalAmount,
        status,
        services: serviceIds
          ? {
              deleteMany: {},
              create: serviceIds.map((serviceId) => ({ serviceId })),
            }
          : undefined,
      },
      include: { services: true },
    });

    return updatedBooking;
  }

  async deleteBooking(id: number): Promise<void> {
    await this.getBookingById(id);
    await this.prisma.booking.delete({ where: { id } });
  }

  async cancelBooking(id: number): Promise<Booking> {
    const booking = await this.getBookingById(id);
    if (!booking) {
      throw new Error("Booking not found.");
    }

    const updatedBooking = await this.prisma.booking.update({
      where: { id },
      data: { status: BookingStatus.CANCELLED },
    });

    return updatedBooking;
  }

  async checkRoomAvailability(
    roomId: number,
    checkIn: Date,
    checkOut: Date
  ): Promise<boolean> {
    const conflictingBookings = await this.prisma.booking.findMany({
      where: {
        roomId,
        AND: [
          { checkOut: { gte: checkIn } },
          { checkIn: { lte: checkOut } },
          { status: BookingStatus.CONFIRMED },
        ],
      },
    });

    return conflictingBookings.length === 0;
  }
}
