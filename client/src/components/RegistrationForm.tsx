import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registration } from "../api/userApi";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import google_logo from "../assets/images/google_logo.png";

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGoogleSignIn = () => {
    console.log("Google Sign-In initiated");
  };

  const handleGuestAccess = () => {
    navigate("/home");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await registration(formData);
      toast.success("Registration successful! Redirecting to home...");
      setFormData({ name: "", email: "", password: "" });
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message ||
            "Registration failed. Please try again."
        );
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        ></input>
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
      >
        Sign up
      </button>

      <div className="text-sm text-center mt-4">
        Already have an account?{" "}
        <button
          type="button"
          className="text-indigo-600 hover:underline"
          onClick={() => navigate("/authorization")}
        >
          Sign in
        </button>
      </div>

      <div className="flex justify-center mt-4">
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full py-2 px-4 bg-white border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-100 transition"
        >
          <img src={google_logo} alt="Google Logo" className="w-6 h-6 mr-2" />
          Sign in with Google
        </button>
      </div>

      <div className="text-center mt-6">
        <button
          type="button"
          onClick={handleGuestAccess}
          className="w-full py-2 px-4 text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-600 hover:text-white transition"
        >
          Continue as Guest
        </button>
      </div>
    </form>
  );
};

export default RegistrationForm;
