# MicroEcom Architecture Demo

A frontend demonstration of a scalable microservices e-commerce platform. This project simulates a complex backend architecture using a modern React frontend.

## Features

-   **Storefront**: A fully functional product catalog with shopping cart functionality.
-   **Admin Dashboard**: Real-time simulated monitoring of microservices (API Gateway, Auth, Product, Cart, Order, Payment, Notification).
-   **AI Insights**: Integrated Google Gemini API to provide on-demand product analysis and selling points.
-   **Order Management**: Track order history and status simulated through local state.

## Tech Stack

-   **Frontend**: React 19, Tailwind CSS
-   **Icons**: Lucide React
-   **Charts**: Recharts
-   **AI**: Google GenAI SDK (`@google/genai`)

## Usage

1.  Browse the store and add items to your cart.
2.  Use the "AI Analysis" button on products to generate dynamic selling points (Requires API Key).
3.  Navigate to "Infrastructure" to view the simulated health of the backend microservices.
4.  Checkout to see orders appear in the "Orders" tab.

## Note

This is a frontend-only demo. The backend services (User, Product, Cart, Order, Payment) are simulated within the browser to demonstrate the architectural concepts without requiring a full Docker/Kubernetes setup locally.
