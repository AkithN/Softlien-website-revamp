import Link from "next/link";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="/logo.png"
                alt="Softlien Logo"
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-sm mb-4">
              Transforming ideas into powerful digital solutions. Your trusted
              partner in software development.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#e8272c] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-[#e8272c] transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-[#e8272c] transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="hover:text-[#e8272c] transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-[#e8272c] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-[#e8272c] transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#e8272c] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#e8272c] transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>Web Development</li>
              <li>Mobile Apps</li>
              <li>Cloud Solutions</li>
              <li>UI/UX Design</li>
              <li>Consulting</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span className="text-sm">
                  123 Tech Street, Silicon Valley, CA 94025
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="flex-shrink-0" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="flex-shrink-0" />
                <span className="text-sm">info@softlien.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2026 Softlien. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
