import React, { useEffect, useState } from "react";
import { getAllRoomsByType } from "../api/roomApi";
import { Room, RoomType } from "../utils/types/room";
import { useParams } from "react-router-dom";

const RoomPage: React.FC = () => {
  const { type = RoomType.ECONOMY } = useParams<{ type?: RoomType }>();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        const fetchedRooms = await getAllRoomsByType(type);
        setRooms(fetchedRooms);
      } catch (err) {
        setError("Не вдалося завантажити номери. Спробуйте пізніше.");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [type]);

  const handleBookRoom = async (roomId: number) => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert(`Номер ${roomId} успішно заброньовано!`);
    } catch (err) {
      alert("Не вдалося забронювати номер. Спробуйте пізніше.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Завантаження...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Доступні номери</h1>
      {rooms.length === 0 ? (
        <p>Немає доступних номерів.</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Номер</th>
              <th className="border border-gray-300 p-2">Тип</th>
              <th className="border border-gray-300 p-2">Статус</th>
              <th className="border border-gray-300 p-2">Ціна</th>
              <th className="border border-gray-300 p-2">Дія</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id} className="text-center">
                <td className="border border-gray-300 p-2">{room.number}</td>
                <td className="border border-gray-300 p-2">{room.type}</td>
                <td className="border border-gray-300 p-2">
                  {room.status === "AVAILABLE" ? "Доступний" : "Недоступний"}
                </td>
                <td className="border border-gray-300 p-2">{room.price} грн</td>
                <td className="border border-gray-300 p-2">
                  {room.status === "AVAILABLE" ? (
                    <button
                      className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                      onClick={() => handleBookRoom(room.id)}
                    >
                      Забронювати
                    </button>
                  ) : (
                    <span className="text-gray-500">Недоступний</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RoomPage;
