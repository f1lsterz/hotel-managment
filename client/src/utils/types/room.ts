export enum RoomStatus {
  AVAILABLE = "AVAILABLE",
  BOOKED = "BOOKED",
  UNDER_MAINTENANCE = "UNDER_MAINTENANCE",
  CLEANING = "CLEANING",
}

export enum RoomType {
  SINGLE = "SINGLE",
  DOUBLE = "DOUBLE",
  DELUXE = "DELUXE",
  ECONOMY = "ECONOMY",
}

export interface Room {
  id: number;
  number: number;
  type: RoomType;
  status: RoomStatus;
  price: number;
}
