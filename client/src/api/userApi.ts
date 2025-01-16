import { User, Login, Registration } from "../utils/types/user";
import { $authHost, $host } from "./config";

export const login = async (data: Login): Promise<{ accessToken: string }> => {
  try {
    const response = await $host.post("/auth/login", data);
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const registration = async (
  data: Registration
): Promise<{ accessToken: string }> => {
  try {
    const response = await $host.post("/auth/registration", data);
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const fetchAllUsers = async (): Promise<User[]> => {
  try {
    const response = await $authHost.get("/user");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const findUserByEmailOrId = async (params: {
  email?: string;
  id?: number;
}): Promise<User | null> => {
  try {
    const response = await $authHost.get("/user/find", { params });
    return response.data;
  } catch (error) {
    console.error("Error finding user:", error);
    throw error;
  }
};

export const updateUser = async (
  id: number,
  data: Partial<User>
): Promise<User> => {
  try {
    const response = await $authHost.patch(`/user/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error);
    throw error;
  }
};

export const deleteUser = async (id: number): Promise<{ message: string }> => {
  try {
    const response = await $authHost.delete(`/user/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting user with ID ${id}:`, error);
    throw error;
  }
};
