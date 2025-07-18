"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface FailureData {
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
  error: string;
}

export default function FailurePage() {
  const [failureData, setFailureData] = useState<FailureData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    // Get failure data from localStorage
    const savedFailureData = localStorage.getItem('failureData');
    if (savedFailureData) {
      setFailureData(JSON.parse(savedFailureData));
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

  const handleRetryPayment = async (paymentMethod: string) => {
    if (!failureData) return;

    setIsRetrying(true);

    // Simulate retry payment processing
    setTimeout(() => {
      // Simulate random success/failure for demo (higher success rate on retry)
      const isSuccess = Math.random() > 0.2; // 80% success rate on retry
      
      if (isSuccess) {
        // Redirect to success page with order details
        const orderData = {
          orderId: `ORD${Date.now()}`,
          name: failureData.name,
          age: failureData.age,
          mobile: failureData.mobile,
          email: failureData.email,
          address: failureData.address,
          pincode: failureData.pincode,
          size: failureData.size,
          color: failureData.color,
          product: failureData.product,
          paymentMethod,
          amount: failureData.product.price,
          timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('orderData', JSON.stringify(orderData));
        localStorage.removeItem('failureData'); // Clear failure data
        window.location.href = '/success';
      } else {
        // Update failure data with new attempt
        const newFailureData = {
          ...failureData,
          orderId: `ORD${Date.now()}`,
          paymentMethod,
          timestamp: new Date().toISOString(),
          error: "Payment failed again due to network issues"
        };
        
        localStorage.setItem('failureData', JSON.stringify(newFailureData));
        setFailureData(newFailureData);
        setIsRetrying(false);
      }
    }, 3000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!failureData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No Payment Information Found</h1>
          <p className="text-gray-600 mb-6">We couldn't find any payment information.</p>
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
              Payment Failed
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Failure Message */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Failed</h1>
          <p className="text-lg text-gray-600">Unfortunately, your payment could not be processed at this time.</p>
        </div>

        {/* Error Details Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Transaction Details</h2>
            <span className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
              Failed
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">TRANSACTION INFORMATION</h3>
              <div className="space-y-1">
                <p><span className="font-medium">Transaction ID:</span> {failureData.orderId}</p>
                <p><span className="font-medium">Date:</span> {formatDate(failureData.timestamp)}</p>
                <p><span className="font-medium">Payment Method:</span> {failureData.paymentMethod}</p>
                <p><span className="font-medium">Amount:</span> ₹{failureData.amount}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">CUSTOMER INFORMATION</h3>
              <div className="space-y-1">
                <p><span className="font-medium">Name:</span> {failureData.name}</p>
                <p><span className="font-medium">Mobile:</span> {failureData.mobile}</p>
                <p><span className="font-medium">Email:</span> {failureData.email}</p>
              </div>
            </div>
          </div>

          {/* Error Information */}
          <div className="border-t border-gray-200 pt-6 mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">ERROR DETAILS</h3>
            <div className="bg-red-50 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 text-red-600 mt-0.5">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-red-800 font-medium">Payment Processing Error</p>
                  <p className="text-red-700 text-sm mt-1">{failureData.error}</p>
                </div>
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
                  alt={failureData.product.name}
                  width={60}
                  height={60}
                  className="object-contain rounded-lg"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{failureData.product.name}</h4>
                <p className="text-sm text-gray-600">{failureData.product.brand}</p>
                <p className="text-sm text-gray-600">Size: {failureData.size} | Color: {failureData.color}</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">₹{failureData.product.price}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Common Issues and Solutions */}
        <div className="bg-yellow-50 rounded-lg p-6 mb-6">
          <h3 className="font-medium text-yellow-900 mb-3">Common Issues and Solutions</h3>
          <ul className="space-y-2 text-sm text-yellow-800">
            <li className="flex items-start space-x-2">
              <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></span>
              <span>Check if your card has sufficient balance or credit limit</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></span>
              <span>Ensure your card is enabled for online transactions</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></span>
              <span>Verify that all card details (number, expiry, CVV) are correct</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></span>
              <span>Try using a different payment method or card</span>
            </li>
          </ul>
        </div>

        {/* Retry Payment Options */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Retry Payment</h3>
          <p className="text-gray-600 mb-6">
            Your order details have been saved. You can retry the payment using the same or different payment method.
          </p>
          
          {isRetrying ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Processing payment...</span>
            </div>
          ) : (
            <div className="space-y-3">
              <button
                onClick={() => handleRetryPayment('Razorpay')}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Retry with Razorpay - ₹{failureData.product.price}
              </button>
              
              <button
                onClick={() => handleRetryPayment('Paytm')}
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                Retry with Paytm - ₹{failureData.product.price}
              </button>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/checkout"
            className="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-200 text-center"
          >
            Modify Order Details
          </Link>
          
          <Link
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 text-center"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Support Information */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Still facing issues? Contact our support team at{' '}
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
