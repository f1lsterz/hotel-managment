import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white py-4 px-6 shadow-md h-28">
      <nav className="flex justify-between items-center">
        <h1 className="text-lg font-bold">
          <Link to="/home" className="hover:text-gray-200">
            Hotel Management
          </Link>
        </h1>
        <ul className="flex gap-4">
          <li>
            <Link to="/home" className="hover:text-gray-200">
              Home
            </Link>
          </li>
          <li>
            <Link to="/rooms" className="hover:text-gray-200">
              Rooms
            </Link>
          </li>
          <li>
            <Link to="/bookings" className="hover:text-gray-200">
              Bookings
            </Link>
          </li>
          <li>
            <Link to="/profile" className="hover:text-gray-200">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/logout" className="hover:text-gray-200">
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
