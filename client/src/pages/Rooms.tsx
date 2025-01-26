import rooms_image from "../assets/images/rooms.jpg";
import { Room } from "../utils/types/room";
import { useState } from "react";
import RoomCard from "../components/RoomCard";
import room1 from "../assets/images/room_types/single/room1.jpg";

const mockRooms = [
  {
    type: "SINGLE",
    price: 80,
    image: room1,
    description: "A cozy room for solo travelers.",
  },
  {
    type: "DOUBLE",
    price: 120,
    image: room1,
    description: "Perfect for couples or friends.",
  },
  {
    type: "DELUXE",
    price: 200,
    image: room1,
    description: "Luxury at its finest.",
  },
  {
    type: "ECONOMY",
    price: 60,
    image: room1,
    description: "Economy.",
  },
];

const Rooms: React.FC = () => {
  const [rooms, setRooms] = useState(mockRooms);

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
            key={room.type}
            name={room.type}
            description={`${room.description} Price: $${room.price}`}
            image={room.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Rooms;
