import LoginForm from "../components/LoginForm";

const Authorization: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default Authorization;
