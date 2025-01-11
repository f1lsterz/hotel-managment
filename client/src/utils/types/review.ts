export interface Review {
  id: number;
  userId: number;
  roomId: number;
  rating: number;
  comment?: string;
  createdAt: string;
}
