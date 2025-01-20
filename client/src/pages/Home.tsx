import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Welcome to Our Hotel
      </h1>
      <p className="text-lg text-center mb-8">
        Experience comfort and luxury during your stay. Browse our rooms and
        book your perfect getaway!
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src="https://via.placeholder.com/300x200"
            alt="Room"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold">Standard Room</h2>
            <p className="text-gray-600 mt-2">
              A cozy room with all essential amenities for a comfortable stay.
            </p>
            <Link to="/rooms" className="mt-4 text-blue-600 hover:underline">
              Explore Rooms
            </Link>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src="https://via.placeholder.com/300x200"
            alt="Room"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold">Deluxe Room</h2>
            <p className="text-gray-600 mt-2">
              Enjoy extra space, a king-size bed, and luxury amenities.
            </p>
            <Link to="/rooms" className="mt-4 text-blue-600 hover:underline">
              Explore Rooms
            </Link>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src="https://via.placeholder.com/300x200"
            alt="Room"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold">Suite</h2>
            <p className="text-gray-600 mt-2">
              A luxurious suite with breathtaking views and top-tier amenities.
            </p>
            <Link to="/rooms" className="mt-4 text-blue-600 hover:underline">
              Explore Rooms
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
