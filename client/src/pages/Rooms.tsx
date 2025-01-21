import rooms_image from "../assets/images/rooms.jpg";
import { Room } from "../utils/types/room";
import { useEffect, useState } from "react";
import { getAllRooms } from "../api/roomApi";
import RoomCard from "../components/RoomCard";

const Rooms: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getAllRooms();
        setRooms(data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="relative w-full h-64">
        <img
          src={rooms_image}
          alt="Rooms"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex justify-center items-center">
          <h2 className="text-white text-4xl font-bold text-shadow-md">
            Rooms
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6 p-6">
        {rooms.map((room) => (
          <RoomCard
            key={room.id}
            id={room.id}
            name={room.number ? `Room ${room.number}` : "Unnamed Room"}
            description={`Type: ${room.type}, Price: $${room.price}`}
            image="https://via.placeholder.com/300x200"
          />
        ))}
      </div>
    </div>
  );
};

export default Rooms;
