# Product Payment Experience - Frontend

A complete product purchase experience with payment integration frontend for Razorpay/Paytm built with Next.js, TypeScript, and Tailwind CSS.

## Features

### Pages Implemented
1. **Product Page** (`/`) - Premium Running Shoes showcase
2. **Checkout Page** (`/checkout`) - Customer data collection and payment options
3. **Success Page** (`/success`) - Order confirmation and details
4. **Failure Page** (`/failure`) - Payment failure handling with retry options

### Functional Requirements Met
- ✅ Collect user data: Name, Age, Mobile, Email
- ✅ Product display with features, pricing, size/color selection
- ✅ Payment integration frontend for Razorpay and Paytm
- ✅ Success page with order details and invoice download
- ✅ Failure page with error details and retry options
- ✅ Form validation and error handling
- ✅ Responsive design for mobile and desktop

### User Flow
1. **Product Page**: Browse product details, select size/color, click "Buy Now"
2. **Checkout Page**: Fill customer information, select payment method
3. **Payment Processing**: Simulated payment (70% success rate for demo)
4. **Success/Failure**: Redirect based on payment outcome
   - **Success**: Show order details, download invoice, continue shopping
   - **Failure**: Show error details, retry payment, or modify order

## Technology Stack

- **Framework**: Next.js 15.4.1 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **Icons**: Emoji and SVG icons
- **State Management**: React useState and localStorage
- **Routing**: Next.js file-based routing

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone or download the project
2. Navigate to the project directory:
   ```bash
   cd product-payment
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx           # Product Page (Home)
│   ├── checkout/
│   │   └── page.tsx       # Checkout Page
│   ├── success/
│   │   └── page.tsx       # Payment Success Page
│   ├── failure/
│   │   └── page.tsx       # Payment Failure Page
│   ├── not-found.tsx      # 404 Page
│   ├── layout.tsx         # Root Layout
│   └── globals.css        # Global Styles
public/
├── shoe-image.svg         # Product Image
└── [other assets]
```

## Key Features Explained

### Payment Simulation
- Simulates real payment flow without actual payment processing
- 70% success rate for initial payments, 80% for retries
- Stores order/failure data in localStorage for persistence

### Form Validation
- Required fields validation (Name, Age, Mobile, Email)
- Email format validation
- Mobile number format validation (10 digits)
- Age range validation (1-120)

### Responsive Design
- Mobile-first approach
- Responsive grid layouts
- Optimized for all screen sizes

### Error Handling
- Comprehensive error messages
- User-friendly failure page with retry options
- Form validation with inline feedback

## Demo Data

The application uses simulated product data for "Premium Running Shoes":
- Price: ₹2,999 (discounted from ₹4,999)
- Multiple sizes and colors available
- Product features and description
- Customer ratings and reviews

## Payment Integration Notes

This is a **frontend-only implementation**. For actual payment processing:
1. Replace the simulated payment functions with real Razorpay/Paytm SDK integration
2. Implement proper backend API endpoints for order processing
3. Add server-side validation and security measures
4. Implement webhook handling for payment confirmation

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is for educational purposes as part of a web development assignment.
