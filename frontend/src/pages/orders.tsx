import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Table, Tag, message } from 'antd';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  product: {
    name: string;
    image?: string;
  };
}

interface Order {
  id: string;
  customerId: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  orderItems: OrderItem[];
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export default function Orders() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/orders/user/${user?.id}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        setOrders(response.data || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        message.error('Failed to load orders');
        setOrders([]);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated, router, user]);

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
      render: (id: string) => `#${id.slice(0, 8)}`,
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'completed' ? 'green' : 'orange'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Total',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (total: number) => `$${total}`,
    },
    {
      title: 'Items',
      key: 'items',
      render: (record: Order) => (
        <div className="space-y-1">
          {record.orderItems?.map((item) => (
            <div key={item.id} className="text-sm">
              {item.product?.name} x {item.quantity}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: 'Shipping',
      key: 'shipping',
      render: (record: Order) => (
        <div className="text-sm">
          <div>{record.customer?.name},</div>
          <div>{record.customer?.address},</div>
          <div>{`${record.customer?.city}, ${record.customer?.state} ${record.customer?.zipCode}`}</div>
          <div>{record.customer?.country}</div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Your Orders</h1>
              <Link href="/">
                <button className="inline-flex items-center text-gray-600 hover:text-gray-900">
                  <FaArrowLeft className="mr-2" />
                  Back to Home
                </button>
              </Link>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">You haven't placed any orders yet.</p>
                <Link href="/">
                  <button className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                    Start Shopping
                  </button>
                </Link>
              </div>
            ) : (
              <Table
                columns={columns}
                dataSource={orders}
                rowKey="id"
                pagination={{ pageSize: 10 }}
                className="orders-table"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 