import { useNavigate } from "react-router-dom";
import { HOME_ROUTE } from "../utils/constants/routes";

interface ErrorPageProps {
  message?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ message }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(HOME_ROUTE);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-500 mb-4">Oops!</h1>
      <p className="text-lg text-gray-700 mb-6">
        {message || "Something went wrong."}
      </p>
      <button
        onClick={handleBackClick}
        className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
      >
        Back
      </button>
    </div>
  );
};

export default ErrorPage;
