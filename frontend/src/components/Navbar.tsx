import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaClipboardList, FaSignOutAlt, FaBars, FaTimes, FaUser, FaUserCircle } from 'react-icons/fa';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();
  const { items } = useCart();

  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-white">E-Commerce Store</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link href="/cart" className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-white hover:text-blue-100 transition-colors duration-200">
                  <FaShoppingCart className="h-5 w-5" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </Link>
                <Link href="/orders" className="inline-flex items-center px-4 py-2 text-sm font-medium text-white hover:text-blue-100 transition-colors duration-200">
                  <FaClipboardList className="h-5 w-5 mr-2" />
                  Orders
                </Link>
                
                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white hover:text-blue-100 transition-colors duration-200"
                  >
                    <FaUserCircle className="h-5 w-5 mr-2" />
                    <span>{user?.name}</span>
                  </button>
                  
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1">
                        <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                          <p className="font-medium text-blue-600">{user?.name}</p>
                          <p className="text-gray-500">{user?.email}</p>
                        </div>
                        <button
                          onClick={logout}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 flex items-center transition-colors duration-200"
                        >
                          <FaSignOutAlt className="h-4 w-4 mr-2" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link href="/login" className="inline-flex items-center px-4 py-2 text-sm font-medium text-white hover:text-blue-100 transition-colors duration-200">
                  <FaUser className="h-5 w-5 mr-2" />
                  Login
                </Link>
                <Link href="/register" className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-white hover:bg-blue-50 rounded-md transition-colors duration-200">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-blue-100 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <FaTimes className="block h-6 w-6" />
              ) : (
                <FaBars className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isAuthenticated ? (
              <>
                <Link href="/cart" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-600">
                  <FaShoppingCart className="h-5 w-5 mr-2" />
                  Cart
                  {cartItemsCount > 0 && (
                    <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </Link>
                <Link href="/orders" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-600">
                  <FaClipboardList className="h-5 w-5 mr-2" />
                  Orders
                </Link>
                <div className="px-3 py-2 border-t border-blue-600">
                  <div className="text-sm text-white">
                    <p className="font-medium">{user?.name}</p>
                    <p className="text-blue-100">{user?.email}</p>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-white hover:bg-red-600 hover:text-white"
                >
                  <FaSignOutAlt className="h-5 w-5 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-600">
                  <FaUser className="h-5 w-5 mr-2" />
                  Login
                </Link>
                <Link href="/register" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-blue-600 bg-white hover:bg-blue-50">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
} 