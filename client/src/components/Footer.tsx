const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 px-6">
      <div className="container mx-auto flex justify-between items-center">
        {/* Лівий блок */}
        <div className="flex-1">
          <h4 className="text-lg font-semibold">Контакти</h4>
          <p className="text-sm mt-2">Email: info@example.com</p>
          <p className="text-sm">Телефон: +380 12 345 6789</p>
        </div>

        {/* Середній блок */}
        <div className="flex-1 text-center">
          <h4 className="text-lg font-semibold">Про нас</h4>
          <p className="text-sm mt-2">
            Ми забезпечуємо комфорт і якісний сервіс для наших гостей.
          </p>
        </div>

        {/* Правий блок */}
        <div className="flex-1 text-right">
          <h4 className="text-lg font-semibold">Соцмережі</h4>
          <ul className="text-sm mt-2 space-y-1">
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                className="hover:underline"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                className="hover:underline"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                className="hover:underline"
              >
                Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
