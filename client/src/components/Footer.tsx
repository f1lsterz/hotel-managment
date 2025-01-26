const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 px-6">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Блок 1 */}
        <div className="flex-1 text-center mx-4">
          <h3 className="text-lg font-bold">About Us</h3>
          <p className="text-sm mt-2">Learn more about our mission and team.</p>
        </div>

        {/* Блок 2 */}
        <div className="flex-1 text-center mx-4">
          <h3 className="text-lg font-bold">Contact</h3>
          <p className="text-sm mt-2">Email us at support@example.com</p>
        </div>

        {/* Блок 3 */}
        <div className="flex-1 text-center mx-4">
          <h3 className="text-lg font-bold">Follow Us</h3>
          <p className="text-sm mt-2">Twitter, Facebook, LinkedIn</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
