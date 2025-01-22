export enum Role {
  ADMIN = "ADMIN",
  RECEPTIONIST = "RECEPTIONIST",
  USER = "USER",
}

export interface User {
  id: number;
  email: string;
  name?: string;
  role: Role;
  photoUrl?: string;
}
