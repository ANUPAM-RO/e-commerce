import React, { useState, useEffect } from 'react';
import { Table, Button, message, Modal, Form, Input } from 'antd';
import { DeleteOutlined, ShoppingCartOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import Link from 'next/link';

const Cart: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useCart();
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

      // First, create or update customer
      const customerData = {
        ...values,
        userId: user?.id
      };

      const customerResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/customers`,
        customerData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      const customerId = customerResponse.data.id;

      // Then create the order
      const orderData = {
        customerId,
        items: cart.map(item => ({
          productId: item.id,
          quantity: item.quantity
        }))
      };

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/orders`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      message.success('Order placed successfully!');
      clearCart();
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.error('Checkout error:', error);
      message.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Product',
      dataIndex: 'name',
      key: 'name',
      width: '40%',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: '20%',
      render: (price: number) => `$${price}`,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      width: '20%',
    },
    {
      title: 'Subtotal',
      key: 'subtotal',
      width: '20%',
      render: (record: any) => `$${(record.price * record.quantity)}`,
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
                <Button type="primary" className="mt-4">
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
                    Total: ${total}
                  </div>
                  <Button
                    type="primary"
                    size="large"
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700"
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
            {/* <Form.Item
              name="Name"
              label="Name"
              rules={[{ required: true, message: 'Please enter your name' }]}
            >
              <Input />
            </Form.Item> */}
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

          <Form.Item className="mt-6">
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading} 
              block
              className="bg-blue-600 hover:bg-blue-700"
            >
              Place Order
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Cart; 