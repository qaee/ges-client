'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface LandingLayoutProps {
  children: React.ReactNode;
}

export default function LandingLayout({ children }: LandingLayoutProps) {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <span className="text-2xl font-bold text-gray-900">GWS</span>
                <span className="ml-2 text-sm text-gray-600">Global Wholesale Solutions</span>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors ${
                    pathname === item.href ? 'text-blue-600 border-b-2 border-blue-600' : ''
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1">
              <h3 className="text-lg font-bold mb-4">GWS</h3>
              <p className="text-gray-400 text-sm">
                Your trusted partner for wholesale solutions. Connecting suppliers with retailers worldwide.
              </p>
            </div>

            {/* Quick Links */}
            <div className="col-span-1">
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white text-sm">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-gray-400 hover:text-white text-sm">
                    Our Services
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white text-sm">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div className="col-span-1">
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li className="text-gray-400 text-sm">Product Sourcing</li>
                <li className="text-gray-400 text-sm">Inventory Management</li>
                <li className="text-gray-400 text-sm">Logistics Support</li>
                <li className="text-gray-400 text-sm">Quality Assurance</li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="col-span-1">
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Email: info@gws.com</li>
                <li>Phone: 1-800-GWS-SALE</li>
                <li>Hours: Mon-Fri 9AM-6PM EST</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 Global Wholesale Solutions. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}