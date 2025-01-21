import { Link } from "react-router-dom";

interface RoomCardProps {
  id: number;
  name: string;
  description: string;
  image: string;
}

const RoomCard: React.FC<RoomCardProps> = ({
  id,
  name,
  description,
  image,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-gray-600 mt-2">{description}</p>
        <Link
          to={`/rooms/${id}`}
          className="mt-4 text-blue-600 hover:underline"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;
