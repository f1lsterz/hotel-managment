export interface Discount {
  id: number;
  name: string;
  description?: string;
  percentage: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
