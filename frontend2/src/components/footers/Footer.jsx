import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="pt-12 text-white bg-gray-900">
      <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Column 1 - Customer Service */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Customer Service</h3>
            <ul className="space-y-2">
              <li><a href="#" className="transition hover:text-gray-300">Contact Us</a></li>
              <li><a href="#" className="transition hover:text-gray-300">Shipping Policy</a></li>
              <Link to='/returns-exchanges'><li><a href="#" className="transition hover:text-gray-300">Returns & Exchanges</a></li></Link>
              <li><a href="#" className="transition hover:text-gray-300">FAQs</a></li>
            </ul>
          </div>

          {/* Column 2 - Company */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Company</h3>
            <ul className="space-y-2">
              <Link to="/about"> <li><a className="transition hover:text-gray-300">About Us</a></li></Link> 
              <li><a href="#" className="transition hover:text-gray-300">Careers</a></li>
              <Link to="privacy"><li><a href="#" className="transition hover:text-gray-300">Privacy Policy</a></li> </Link>
              <li><a href="#" className="transition hover:text-gray-300">Terms of Service</a></li>
            </ul>
          </div>

          {/* Column 3 - Social Media */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="transition hover:text-gray-300">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="transition hover:text-gray-300">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="transition hover:text-gray-300">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="transition hover:text-gray-300">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>

          {/* Column 4 - Newsletter */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Newsletter</h3>
            <p className="mb-4">Subscribe to our newsletter for updates</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-2 text-gray-900 rounded-l-md"
              />
              <button
                type="submit"
                className="px-4 py-2 transition-colors bg-blue-600 hover:bg-blue-700 rounded-r-md"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 pb-4 mt-8 border-t border-gray-800">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} Your Ecommerce Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;