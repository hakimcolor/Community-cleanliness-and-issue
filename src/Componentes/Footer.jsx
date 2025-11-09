import { NavLink } from 'react-router-dom';
import { FaFacebookF, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <NavLink to="/" className="hover:text-indigo-500">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/services" className="hover:text-indigo-500">
                Services
              </NavLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">Contact Info</h3>
          <p>Email: hakimcolor777@gmail.com</p>
          <p>Phone: +880 1818 777 856</p>
          <p>Address: Jessore, Bangladesh</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">Social Links</h3>
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/hakimcolorofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-500"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://x.com/hakimcolor"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-500"
            >
              <FaTwitter size={20} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">Privacy Policy</h3>
          <p className="text-gray-400 text-sm">
            At WarmPaws, we value your privacy and protect your personal,
            information. We never share your data with third parties without
            consent. By using our services, you agree to our privacy practices.
          </p>
        </div>
      </div>

      <p className="text-center text-gray-500 mt-8 text-sm">
        &copy; {new Date().getFullYear()} WarmPaws. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
