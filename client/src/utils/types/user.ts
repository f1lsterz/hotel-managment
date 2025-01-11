export enum Role {
  ADMIN = "ADMIN",
  RECEPTIONIST = "RECEPTIONIST",
  USER = "USER",
}

export interface OAuthAccount {
  id: number;
  provider: string;
  providerId: string;
  userId: number;
  createdAt: string;
}

export interface User {
  id: number;
  email: string;
  name?: string;
  password: string;
  role: Role;
  photoUrl?: string;
  createdAt: string;
  updatedAt: string;
}
