import { $authHost, $host } from "../api/config";
import { Room } from "../utils/types/room";

export const getAllRooms = async (filters?: Partial<Room>): Promise<Room[]> => {
  try {
    const response = await $host.get<Room[]>("/rooms", { params: filters });
    return response.data;
  } catch (error) {
    console.error("Error fetching all rooms:", error);
    throw error;
  }
};

export const getAllRoomsByType = async (): Promise<Room[]> => {
  try {
    console.log("fdsfsd");
    const response = await $host.get<Room[]>("/rooms/types");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching rooms by type:", error);
    throw error;
  }
};

export const getRoomById = async (id: number): Promise<Room> => {
  try {
    const response = await $host.get<Room>(`/rooms/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching room with ID ${id}:`, error);
    throw error;
  }
};

export const createRoom = async (room: Partial<Room>): Promise<Room> => {
  try {
    const response = await $authHost.post<Room>("/rooms", room);
    return response.data;
  } catch (error) {
    console.error("Error creating room:", error);
    throw error;
  }
};

export const updateRoom = async (
  id: number,
  room: Partial<Room>
): Promise<Room> => {
  try {
    const response = await $authHost.put<Room>(`/rooms/${id}`, room);
    return response.data;
  } catch (error) {
    console.error(`Error updating room with ID ${id}:`, error);
    throw error;
  }
};

export const deleteRoom = async (id: number): Promise<void> => {
  try {
    await $authHost.delete(`/rooms/${id}`);
  } catch (error) {
    console.error(`Error deleting room with ID ${id}:`, error);
    throw error;
  }
};
