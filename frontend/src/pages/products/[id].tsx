import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';
import { FaArrowLeft, FaShoppingCart, FaHeart, FaShare, FaStar, FaPlus, FaMinus } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { message } from 'antd';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  isActive: boolean;
  image?: string;
}

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { isAuthenticated } = useAuth();
  const { addItem, getItemQuantity } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/api/products/${id}`);
          setProduct(response.data);
          // Initialize quantity with cart quantity if item exists in cart
          const cartQuantity = getItemQuantity(response.data.id);
          if (cartQuantity > 0) {
            setQuantity(cartQuantity);
          }
          setLoading(false);
        } catch (error) {
          console.error('Error fetching product:', error);
          setError('Failed to load product. Please try again later.');
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id, isAuthenticated, router, getItemQuantity]);

  const handleAddToCart = () => {
    if (!product) return;

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      stock: product.stock,
      quantity: quantity
    });
    
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleIncreaseQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(prev => prev + 1);
    } else {
      message.warning('Cannot exceed available stock');
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{error || 'Product not found'}</h2>
          <Link href="/">
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
              Back to Products
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between"
          >
            <div className="flex items-center">
              <FaShoppingCart className="text-green-500 mr-2" />
              <span className="text-green-700">Product added to cart successfully!</span>
            </div>
            <Link href="/cart">
              <button className="text-green-700 hover:text-green-900 font-medium">
                View Cart
              </button>
            </Link>
          </motion.div>
        )}

        {/* Back Button */}
        <Link href="/">
          <button className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
            <FaArrowLeft className="mr-2" />
            Back to Products
          </button>
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No image available
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-gray-600 mb-6">{product.description}</p>
              
              <div className="flex items-center mb-6">
                <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                <span className="ml-4 text-sm text-gray-500">In Stock: {product.stock}</span>
              </div>

              {/* Quantity Controls */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleDecreaseQuantity}
                    disabled={quantity <= 1}
                    className={`p-2 rounded-md border ${
                      quantity <= 1
                        ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                        : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <FaMinus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center text-lg font-medium">{quantity}</span>
                  <button
                    onClick={handleIncreaseQuantity}
                    disabled={quantity >= product.stock}
                    className={`p-2 rounded-md border ${
                      quantity >= product.stock
                        ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                        : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <FaPlus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex space-x-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className={`flex-1 flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
                      product.stock === 0
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700'
                    }`}
                  >
                    <FaShoppingCart className="mr-2" />
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                  <Link href="/cart">
                    <button className="flex-1 flex items-center justify-center px-6 py-3 border border-indigo-600 rounded-md shadow-sm text-base font-medium text-indigo-600 bg-white hover:bg-indigo-50">
                      View Cart
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 