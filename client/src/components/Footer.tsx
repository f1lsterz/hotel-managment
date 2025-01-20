const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 px-6 mt-auto h-48">
      <div className="flex justify-between items-center">
        <div className="text-center md:text-left">
          <p>&copy; 2025 Hotel Management System</p>
        </div>

        <div className="text-center">
          <a href="/privacy" className="text-gray-400 hover:text-gray-200">
            Privacy Policy
          </a>{" "}
          |{" "}
          <a href="/terms" className="text-gray-400 hover:text-gray-200">
            Terms of Service
          </a>
        </div>

        <div className="text-center md:text-right">
          <p>Follow us:</p>
          <div>
            <a
              href="https://facebook.com"
              className="text-gray-400 hover:text-gray-200 mr-2"
            >
              Facebook
            </a>
            <a
              href="https://twitter.com"
              className="text-gray-400 hover:text-gray-200 mr-2"
            >
              Twitter
            </a>
            <a
              href="https://instagram.com"
              className="text-gray-400 hover:text-gray-200"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
