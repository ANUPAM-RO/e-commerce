interface Product {
  id: string;
  name: string;
  price: number;
}

interface CartItem {
  productId: string;
  quantity: number;
}

interface CartProps {
  cart: CartItem[];
  products: Product[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
}

export default function Cart({ cart, products, onUpdateQuantity, onRemoveItem }: CartProps) {
  const cartItems = cart.map(item => {
    const product = products.find(p => p.id === item.productId);
    return {
      ...item,
      product,
      subtotal: product ? product.price * item.quantity : 0,
    };
  });

  const total = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

  if (cart.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 right-0 w-full md:w-96 bg-white shadow-lg rounded-t-lg p-4">
      <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {cartItems.map(item => (
          <div key={item.productId} className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">{item.product?.name}</h3>
              <p className="text-sm text-gray-600">${item.product?.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                +
              </button>
              <button
                onClick={() => onRemoveItem(item.productId)}
                className="ml-2 text-red-600"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t">
        <div className="flex justify-between font-bold">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button
          onClick={() => {/* TODO: Implement checkout */}}
          className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Checkout
        </button>
      </div>
    </div>
  );
} 