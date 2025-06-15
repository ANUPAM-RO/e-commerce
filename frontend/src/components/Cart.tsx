import React, { useState, useEffect } from 'react';
import { Table, Button, message, Modal, Form, Input } from 'antd';
import { DeleteOutlined, ShoppingCartOutlined, ArrowLeftOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import Link from 'next/link';

const Cart: React.FC = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (isModalOpen && user) {
      form.setFieldsValue({
        email: user.email,
      });
    }
  }, [isModalOpen, user, form]);

  const handleCheckout = async (values: any) => {
    try {
      setLoading(true);
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const customerData = {
        ...values,
        userId: user?.id
      };

      const customerResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/customers`,
        customerData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      const customerId = customerResponse.data.id;

      const orderData = {
        customerId,
        items: cart.map(item => ({
          productId: item.id,
          quantity: item.quantity
        }))
      };

      const orderResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/orders`,
        orderData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      message.success('Order placed successfully!');
      clearCart();
      setIsModalOpen(false);
      form.resetFields();
    } catch (error: any) {
      console.error('Checkout error:', error);
      if (error.response) {
        message.error(error.response.data.message || 'Failed to place order. Please try again.');
      } else {
        message.error('Failed to place order. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  const handleIncreaseQuantity = (id: string, currentQuantity: number, stock: number) => {
    if (currentQuantity < stock) {
      updateQuantity(id, currentQuantity + 1);
    } else {
      message.warning('Cannot exceed available stock');
    }
  };

  const handleDecreaseQuantity = (id: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(id, currentQuantity - 1);
    } else {
      removeFromCart(id);
    }
  };

  const columns = [
    {
      title: 'Product',
      dataIndex: 'name',
      key: 'name',
      width: '35%',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: '15%',
      render: (price: number) => `$${price}`,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      width: '25%',
      render: (quantity: number, record: any) => (
        <div className="flex items-center space-x-2">
          <Button
            icon={<MinusOutlined />}
            onClick={() => handleDecreaseQuantity(record.id, quantity)}
            className="flex items-center justify-center"
          />
          <span className="w-8 text-center">{quantity}</span>
          <Button
            icon={<PlusOutlined />}
            onClick={() => handleIncreaseQuantity(record.id, quantity, record.stock)}
            className="flex items-center justify-center"
          />
        </div>
      ),
    },
    {
      title: 'Subtotal',
      key: 'subtotal',
      width: '15%',
      render: (record: any) => `$${(record.price * record.quantity).toFixed(2)}`,
    },
    {
      title: 'Action',
      key: 'action',
      width: '10%',
      render: (record: any) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => removeFromCart(record.id)}
          className="hover:bg-red-50"
        />
      ),
    },
  ];

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
            <Link href="/">
              <Button 
                icon={<ArrowLeftOutlined />}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                Continue Shopping
              </Button>
            </Link>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCartOutlined className="text-6xl text-gray-400 mb-4" />
              <p className="text-xl text-gray-500">Your cart is empty</p>
              <Link href="/">
                <Button type="primary" className="mt-4 bg-indigo-600 hover:bg-indigo-700">
                  Start Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <Table
                columns={columns}
                dataSource={cart}
                rowKey="id"
                pagination={false}
                className="mb-6"
              />
              <div className="border-t border-gray-200 pt-6">
                <div className="flex justify-between items-center">
                  <div className="text-xl font-bold text-gray-900">
                    Total: ${total.toFixed(2)}
                  </div>
                  <Button
                    type="primary"
                    size="large"
                    onClick={() => setIsModalOpen(true)}
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <Modal
        title="Enter Your Details"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCheckout}
          className="mt-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone"
              rules={[{ required: true, message: 'Please enter your phone number' }]}
            >
              <Input />
            </Form.Item>
          </div>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: 'Please enter your address' }]}
          >
            <Input />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="city"
              label="City"
              rules={[{ required: true, message: 'Please enter your city' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="state"
              label="State"
              rules={[{ required: true, message: 'Please enter your state' }]}
            >
              <Input />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="zipCode"
              label="ZIP Code"
              rules={[{ required: true, message: 'Please enter your ZIP code' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="country"
              label="Country"
              rules={[{ required: true, message: 'Please enter your country' }]}
            >
              <Input />
            </Form.Item>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <Button onClick={() => {
              setIsModalOpen(false);
              form.resetFields();
            }}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={loading} className="bg-indigo-600 hover:bg-indigo-700">
              Place Order
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Cart; 