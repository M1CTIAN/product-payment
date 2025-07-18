"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface OrderData {
  orderId: string;
  name: string;
  age: string;
  mobile: string;
  email: string;
  address: string;
  pincode: string;
  size: string;
  color: string;
  product: {
    name: string;
    brand: string;
    price: number;
    originalPrice: number;
    discount: number;
  };
  paymentMethod: string;
  amount: number;
  timestamp: string;
}

export default function SuccessPage() {
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get order data from localStorage
    const savedOrderData = localStorage.getItem('orderData');
    if (savedOrderData) {
      setOrderData(JSON.parse(savedOrderData));
    }
    setIsLoading(false);
  }, []);

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const downloadInvoice = () => {
    if (!orderData) return;

    const invoiceContent = `
INVOICE - ${orderData.orderId}
====================================

Order Details:
- Order ID: ${orderData.orderId}
- Date: ${formatDate(orderData.timestamp)}
- Payment Method: ${orderData.paymentMethod}

Customer Information:
- Name: ${orderData.name}
- Age: ${orderData.age}
- Mobile: ${orderData.mobile}
- Email: ${orderData.email}
- Address: ${orderData.address || 'Not provided'}
- PIN Code: ${orderData.pincode || 'Not provided'}

Product Information:
- Product: ${orderData.product.name}
- Brand: ${orderData.product.brand}
- Size: ${orderData.size}
- Color: ${orderData.color}
- Amount Paid: ₹${orderData.amount}

Thank you for shopping with SportMax Store!
    `;

    const element = document.createElement('a');
    const file = new Blob([invoiceContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `invoice-${orderData.orderId}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const showFailureDemo = () => {
    if (!orderData) return;

    const userConfirmed = window.confirm(
      "Do you want to see the failure page demo?\n\nThis will simulate a payment failure scenario for demonstration purposes."
    );

    if (userConfirmed) {
      // Create failure data based on current order data
      const failureData = {
        orderId: `ORD${Date.now()}`,
        name: orderData.name,
        age: orderData.age,
        mobile: orderData.mobile,
        email: orderData.email,
        address: orderData.address,
        pincode: orderData.pincode,
        size: orderData.size,
        color: orderData.color,
        product: orderData.product,
        paymentMethod: orderData.paymentMethod,
        amount: orderData.amount,
        timestamp: new Date().toISOString(),
        error: "Payment failed due to network issues (Demo)"
      };

      localStorage.setItem('failureData', JSON.stringify(failureData));
      window.location.href = '/failure';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No Order Found</h1>
          <p className="text-gray-600 mb-6">We couldn't find any order information.</p>
          <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Back to Store
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-gray-900">SportMax Store</Link>
            <div className="text-sm text-gray-600">
              Order Confirmation
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-lg text-gray-600">Thank you for your order. Your payment has been processed successfully.</p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Order Details</h2>
            <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
              Confirmed
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">ORDER INFORMATION</h3>
              <div className="space-y-1 text-gray-600">
                <p><span className="font-medium">Order ID:</span> {orderData.orderId}</p>
                <p><span className="font-medium">Date:</span> {formatDate(orderData.timestamp)}</p>
                <p><span className="font-medium">Payment Method:</span> {orderData.paymentMethod}</p>
                <p><span className="font-medium">Amount Paid:</span> ₹{orderData.amount}</p>
              </div>
            </div>

            <div className="text-gray-600">
              <h3 className="text-sm font-medium text-gray-600 mb-2">DELIVERY INFORMATION</h3>
              <div className="space-y-1">
                <p><span className="font-medium">Name:</span> {orderData.name}</p>
                <p><span className="font-medium">Mobile:</span> {orderData.mobile}</p>
                <p><span className="font-medium">Email:</span> {orderData.email}</p>
                {orderData.address && (
                  <p><span className="font-medium">Address:</span> {orderData.address}</p>
                )}
                {orderData.pincode && (
                  <p><span className="font-medium">PIN Code:</span> {orderData.pincode}</p>
                )}
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-sm font-medium text-gray-500 mb-4">PRODUCT DETAILS</h3>
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                <Image
                  src="/shoe-image.svg"
                  alt={orderData.product.name}
                  width={60}
                  height={60}
                  className="object-contain rounded-lg"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{orderData.product.name}</h4>
                <p className="text-sm text-gray-600">{orderData.product.brand}</p>
                <p className="text-sm text-gray-600">Size: {orderData.size} | Color: {orderData.color}</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">₹{orderData.product.price}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Expected Delivery */}
        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-blue-900">Expected Delivery</h3>
              <p className="text-sm text-blue-700">
                Your order will be delivered within 3-5 business days. You'll receive tracking information via email.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <button
            onClick={downloadInvoice}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-200"
          >
            Download Invoice
          </button>
          
          <Link
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 text-center"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Demo Section */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-yellow-900">Demo Mode</h3>
              <p className="text-sm text-yellow-700">
                Want to see how the failure page looks? Click the button below to experience the complete payment flow.
              </p>
            </div>
          </div>
          <button
            onClick={showFailureDemo}
            className="bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors duration-200"
          >
            🎭 View Failure Page Demo
          </button>
        </div>

        {/* Support Information */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Need help with your order? Contact our support team at{' '}
            <a href="mailto:support@sportmax.com" className="text-blue-600 hover:underline">
              support@sportmax.com
            </a>{' '}
            or call{' '}
            <a href="tel:+919876543210" className="text-blue-600 hover:underline">
              +91 98765 43210
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
