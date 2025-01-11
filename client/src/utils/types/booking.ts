export enum BookingStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
}

export interface Booking {
  id: number;
  userId: number;
  roomId: number;
  checkIn: string;
  checkOut: string;
  totalAmount: number;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
}
