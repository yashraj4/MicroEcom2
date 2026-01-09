# MicroEcom Architecture Demo

A frontend demonstration of a scalable microservices e-commerce platform. This project simulates a complex backend architecture using a modern React frontend.

## Features

-   **Storefront**: A fully functional product catalog with shopping cart functionality.
-   **Admin Dashboard**: Real-time simulated monitoring of microservices (API Gateway, Auth, Product, Cart, Order, Payment, Notification).
-   **Order Management**: Track order history and status simulated through local state.

## Tech Stack

-   **Frontend**: React 19, Tailwind CSS
-   **Icons**: Lucide React
-   **Charts**: Recharts

## Usage

1.  Browse the store and add items to your cart.
2.  Navigate to "Infrastructure" to view the simulated health of the backend microservices.
3.  Checkout to see orders appear in the "Orders" tab.

## Note

This is a frontend-only demo. The backend services (User, Product, Cart, Order, Payment) are simulated within the browser to demonstrate the architectural concepts without requiring a full Docker/Kubernetes setup locally.
