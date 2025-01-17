import RegistrationForm from "../components/RegistrationForm";

const RegistrationPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Register</h1>
        <RegistrationForm />
      </div>
    </div>
  );
};

export default RegistrationPage;
