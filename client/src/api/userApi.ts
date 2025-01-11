import { User } from "../utils/types/user";
import { $authHost } from "./config";

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
