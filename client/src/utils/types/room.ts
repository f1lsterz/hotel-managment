export enum RoomStatus {
  AVAILABLE = "AVAILABLE",
  BOOKED = "BOOKED",
  UNDER_MAINTENANCE = "UNDER_MAINTENANCE",
  CLEANING = "CLEANING",
}

export enum RoomType {
  SINGLE = "SINGLE",
  DOUBLE = "DOUBLE",
  SUITE = "SUITE",
  DELUXE = "DELUXE",
}

export interface Room {
  id: number;
  number: number;
  type: RoomType;
  status: RoomStatus;
  price: number;
  isAvailable?: boolean;
  features?: string[];
  createdAt: string;
  updatedAt: string;
}
