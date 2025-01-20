const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 px-6 mt-auto">
      <div className="text-center">
        <p>&copy; 2025 Hotel Management System. All rights reserved.</p>
        <div>
          <a href="/privacy" className="text-gray-400 hover:text-gray-200">
            Privacy Policy
          </a>{" "}
          |{" "}
          <a href="/terms" className="text-gray-400 hover:text-gray-200">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
