import { Role } from "./user";

export interface Registration {
  email: string;
  password: string;
  name: string;
  role?: Role;
}
