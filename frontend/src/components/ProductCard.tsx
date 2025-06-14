interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
          <p className="text-sm text-gray-500">In stock: {product.stock}</p>
        </div>
        <button
          onClick={onAddToCart}
          disabled={product.stock === 0}
          className={`px-4 py-2 rounded-md ${
            product.stock === 0
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
} 