import { $authHost, $host } from "../api/config";
import { Room } from "../utils/types/room";

export const roomAPI = {
  async getAllRooms(filters?: Partial<Room>): Promise<Room[]> {
    const { data } = await $host.get<Room[]>("/room", { params: filters });
    return data;
  },

  async getRoomById(id: number): Promise<Room> {
    const { data } = await $host.get<Room>(`/room/${id}`);
    return data;
  },

  async createRoom(room: Partial<Room>): Promise<Room> {
    const { data } = await $authHost.post<Room>("/room", room);
    return data;
  },

  async updateRoom(id: number, room: Partial<Room>): Promise<Room> {
    const { data } = await $authHost.put<Room>(`/room/${id}`, room);
    return data;
  },

  async deleteRoom(id: number): Promise<void> {
    await $authHost.delete(`/room/${id}`);
  },
};

export const getAllRooms = async (filters?: Partial<Room>): Promise<Room[]> => {
  const { data } = await $host.get<Room[]>("/room", { params: filters });
  return data;
};

export const getRoomById = async (id: number): Promise<Room> => {
  const { data } = await $host.get<Room>(`/room/${id}`);
  return data;
};
