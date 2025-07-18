"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function CheckoutPage() {
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        mobile: "",
        email: "",
        address: "",
        pincode: "",
        size: "9",
        color: "Black",
    });

    const [isProcessing, setIsProcessing] = useState(false);

    const product = {
        name: "Premium Running Shoes",
        brand: "SportMax",
        price: 2999,
        originalPrice: 4999,
        discount: 40,
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        const { name, age, mobile, email } = formData;

        if (!name || !age || !mobile || !email) {
            alert("Please fill in all required fields");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address");
            return false;
        }

        const mobileRegex = /^[0-9]{10}$/;
        if (!mobileRegex.test(mobile)) {
            alert("Please enter a valid 10-digit mobile number");
            return false;
        }

        if (parseInt(age) < 1 || parseInt(age) > 120) {
            alert("Please enter a valid age");
            return false;
        }

        return true;
    };

    const handlePayment = async (paymentMethod: string) => {
        if (!validateForm()) return;

        setIsProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            // Simulate random success/failure for demo
            const isSuccess = Math.random() > 0.3; // 70% success rate

            if (isSuccess) {
                // Redirect to success page with order details
                const orderData = {
                    orderId: `ORD${Date.now()}`,
                    ...formData,
                    product,
                    paymentMethod,
                    amount: product.price,
                    timestamp: new Date().toISOString()
                };

                localStorage.setItem('orderData', JSON.stringify(orderData));
                window.location.href = '/success';
            } else {
                // Redirect to failure page
                const failureData = {
                    orderId: `ORD${Date.now()}`,
                    ...formData,
                    product,
                    paymentMethod,
                    amount: product.price,
                    timestamp: new Date().toISOString(),
                    error: "Payment failed due to technical issues"
                };

                localStorage.setItem('failureData', JSON.stringify(failureData));
                window.location.href = '/failure';
            }
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="text-2xl font-bold text-gray-900">SportMax Store</Link>
                        <div className="text-sm text-gray-600">
                            Secure Checkout
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="lg:grid lg:grid-cols-3 lg:gap-x-8">

                    {/* Customer Information Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">Customer Information</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                                        Age *
                                    </label>
                                    <input
                                        type="number"
                                        id="age"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter your age"
                                        min="1"
                                        max="120"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                                        Mobile Number *
                                    </label>
                                    <input
                                        type="tel"
                                        id="mobile"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter 10-digit mobile number"
                                        maxLength={10}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter your email address"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                                        Delivery Address
                                    </label>
                                    <textarea
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        rows={3}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter your complete address"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-2">
                                        PIN Code
                                    </label>
                                    <input
                                        type="text"
                                        id="pincode"
                                        name="pincode"
                                        value={formData.pincode}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter PIN code"
                                        maxLength={6}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-2">
                                        Size
                                    </label>
                                    <select
                                        id="size"
                                        name="size"
                                        value={formData.size}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-2">
                                        Color
                                    </label>
                                    <select
                                        id="color"
                                        name="color"
                                        value={formData.color}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="Black">Black</option>
                                        <option value="White">White</option>
                                        <option value="Blue">Blue</option>
                                        <option value="Red">Red</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary & Payment */}
                    <div className="mt-8 lg:mt-0">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

                            {/* Product Details */}
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                                    <Image
                                        src="/shoe-image.svg"
                                        alt={product.name}
                                        width={50}
                                        height={50}
                                        className="object-contain rounded-lg"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-medium text-gray-900">{product.name}</h3>
                                    <p className="text-sm text-gray-600">{product.brand}</p>
                                    <p className="text-sm text-gray-600">Size: {formData.size} | Color: {formData.color}</p>
                                </div>
                            </div>

                            {/* Price Breakdown */}
                            <div className="border-t border-gray-200 pt-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Original Price</span>
                                    <span className="line-through text-gray-500">₹{product.originalPrice}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Discount ({product.discount}%)</span>
                                    <span className="text-green-600">-₹{product.originalPrice - product.price}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Delivery</span>
                                    <span className="text-green-600">FREE</span>
                                </div>
                                <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold">
                                    <span>Total Amount</span>
                                    <span>₹{product.price}</span>
                                </div>
                            </div>

                            {/* Payment Options */}
                            <div className="mt-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Options</h3>

                                {isProcessing ? (
                                    <div className="flex items-center justify-center py-8">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                        <span className="ml-3 text-gray-600">Processing payment...</span>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <button
                                            onClick={() => handlePayment('Razorpay')}
                                            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                                        >
                                            Pay with Razorpay - ₹{product.price}
                                        </button>

                                        <button
                                            onClick={() => handlePayment('Paytm')}
                                            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
                                        >
                                            Pay with Paytm - ₹{product.price}
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Security Info */}
                            <div className="mt-6 pt-4 border-t border-gray-200">
                                <div className="flex items-center text-sm text-gray-600">
                                    <span className="mr-2">🔒</span>
                                    Your payment information is secure and encrypted
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
