# Cyber Management System 🚀

This project is a full-stack application designed to manage products, consoles, sales, and sessions for a cyber cafe.

## 📜 Table of Contents

- [🚀 Project Title & Badges](#-project-title--badges)
- [📝 Description](#-description)
- [📚 Table of Contents](#-table-of-contents)
- [✨ Features](#-features)
- [💻 Tech Stack](#-tech-stack)
- [⚙️ Installation](#-installation)
- [💡 Usage](#-usage)
- [📁 Project Structure](#-project-structure)
- [🔗 API Reference](#-api-reference)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [⭐ Important Links](#-important-links)
- [📝 Footer](#-footer)

## 🚀 Project Title & Badges

![JavaScript](https://img.shields.io/badge/javascript-ES6-blue.svg)
![Python](https://img.shields.io/badge/python-3.x-blue.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.136.1-green.svg)
![React](https://img.shields.io/badge/React-19.x-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-N/A-informational)

## 📝 Description

This application provides a comprehensive solution for managing a cyber cafe. It includes functionalities for:

- **Product Management:** Track inventory, purchase prices, sale prices, and stock levels.
- **Console Management:** Monitor the status of gaming consoles (Available, Occupied, Inactive).
- **Session Tracking:** Start and end gaming sessions, calculating duration and total price based on defined rates.
- **Sales Management:** Record product sales, calculate totals, and view sales history.
- **Rate Management:** Define hourly rates based on the number of players.
- **Dashboard:** Visualize key metrics like total revenue, sales, and console occupancy.

The system is composed of a FastAPI backend and a React frontend.

## ✨ Features

- **Product CRUD:** Create, Read, Update, and Delete products.
- **Console Status Management:** Real-time tracking of console availability.
- **Session Lifecycle Management:** Start, end, and track active and historical gaming sessions.
- **Sales Recording:** Efficiently record product sales and generate receipts.
- **Dynamic Pricing:** Rates are dynamically applied based on player count and session duration.
- **Interactive Dashboard:** Visual representation of key business metrics.
- **Responsive UI:** User-friendly interface built with React.

## 💻 Tech Stack

- **Backend:**
  - **Language:** Python
  - **Framework:** FastAPI
  - **Database ORM:** SQLAlchemy
  - **Database Driver:** psycopg2-binary (for PostgreSQL)
  - **Other Libraries:** pydantic, python-dotenv, alembic

- **Frontend:**
  - **Library:** React
  - **Framework:** Vite
  - **Routing:** React Router DOM
  - **UI Components:** lucide-react (for icons)
  - **Styling:** CSS
  - **Linting:** ESLint

## ⚙️ Installation

### Backend (FastAPI)

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/PDR1004/cyber-management-system.git
    cd cyber-management-system/Backend
    ```

2.  **Create and activate a virtual environment:**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Set up environment variables:**
    Create a `.env` file in the `Backend` directory with your database connection URL:
    ```dotenv
    DATABASE_URL=postgresql://user:password@host:port/database_name
    ```

5.  **Run database migrations (if using Alembic):**
    ```bash
    alembic init alembic
    # Configure alembic.ini and env.py for your database
    alembic revision --autogenerate -m "create tables"
    alembic upgrade head
    ```
    *Note: The provided code directly creates tables using `Base.metadata.create_all(bind=engine)`. Alembic setup might be optional depending on the desired deployment strategy.* 

6.  **Run the backend server:**
    ```bash
    uvicorn app.main:app --reload
    ```

### Frontend (React)

1.  **Navigate to the frontend directory:**
    ```bash
    cd ../Frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

## 💡 Usage

This application is designed to streamline the operations of a cyber cafe. Here's how you can use its core functionalities:

### Product Management 🛍️

-   Navigate to the **Products** section in the sidebar.
-   **Add New Products:** Fill in the form with product details (name, purchase price, sale price, stock, category) and click "Create Product".
-   **View Products:** A list of all active products is displayed.
-   **Edit Products:** Click the "Edit" button on a product row to modify its details.
-   **Delete Products:** Click the "Delete" button to mark a product as inactive.
-   **View Details:** Click "View" to see more specific information about a product.

### Console Management 🎮

-   Navigate to the **Consoles** section.
-   **Add Consoles:** Enter a console name and click "Create Console".
-   **View Consoles:** See a list of all consoles with their current status (Available, Occupied, Inactive).
-   **Edit Consoles:** Modify console names or their status.
-   **Delete Consoles:** Mark consoles as "Inactive" if they are no longer in use.

### Session Management ⏱️

-   Navigate to the **Sessions** section.
-   **Start a Session:** Select an available console and enter the number of players. Click "Start Session". The console status will update to "Occupied".
-   **View Active Sessions:** See a list of currently running sessions with their start time.
-   **End a Session:** Click "End Session" for an active session. The system calculates the total price based on the defined rates and marks the console as "Available".
-   **View Session History:** Browse past sessions, filter by date, and see total revenue.

### Sales Management 💰

-   Navigate to the **Sales** section.
-   **Create a Sale:** Select products from the dropdown, enter the quantity, and click "Add". The item will be added to the current sale.
-   **View Sale Details:** See the list of items and the running total for the current sale.
-   **Finalize Sale:** Click "Finalize Sale" to record the transaction. The stock of the products will be updated accordingly.
-   **View Sales History:** Browse past sales, filter by date, and view detailed receipts.

### Rate Management 💲

-   Navigate to the **Rates** section.
-   **Add Rates:** Define rates by specifying the number of players and the price per hour.
-   **View Rates:** See all defined rates.
-   **Edit/Delete Rates:** Modify or remove existing rates.

### Dashboard 📊

-   Navigate to the **Dashboard** section.
-   **Overview:** Get a summary of total revenue, product sales, session income, and current console occupancy.
-   **Period Selection:** Filter the displayed data by "Today", "Last 7 days", or "This month".
-   **Daily Revenue Chart:** Visualize daily revenue from products and sessions over the last 7 days.

## 📁 Project Structure

```
cyber-management-system/
├── Backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── database/
│   │   │   ├── __init__.py
│   │   │   ├── base.py
│   │   │   ├── connection.py
│   │   │   └── dependencies.py
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   ├── console.py
│   │   │   ├── product.py
│   │   │   ├── rate.py
│   │   │   ├── sale.py
│   │   │   ├── sale_detail.py
│   │   │   └── session.py
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   ├── console_routes.py
│   │   │   ├── product_routes.py
│   │   │   ├── rate_routes.py
│   │   │   ├── sale_routes.py
│   │   │   └── session_routes.py
│   │   ├── schemas/
│   │   │   ├── __init__.py
│   │   │   ├── console.py
│   │   │   ├── product.py
│   │   │   ├── rate.py
│   │   │   ├── sale.py
│   │   │   └── session.py
│   │   └── services/
│   │       ├── __init__.py
│   │       ├── console_service.py
│   │       ├── product_service.py
│   │       ├── rate_service.py
│   │       ├── sale_service.py
│   │       └── session_service.py
│   ├── migrations/ (Alembic migrations, if configured)
│   ├── .env (Environment variables)
│   ├── main.py (FastAPI app entry point)
│   ├── requirements.txt (Backend dependencies)
│   └── uvicorn_config.py (Uvicorn configuration, if any)
│
└── Frontend/
    ├── public/
    │   └── favicon.svg
    ├── src/
    │   ├── components/
    │   │   ├── Sidebar.css
    │   │   └── Sidebar.jsx
    │   ├── pages/
    │   │   ├── Consoles.css
    │   │   ├── Consoles.jsx
    │   │   ├── Dashboard.css
    │   │   ├── Dashboard.jsx
    │   │   ├── Products.css
    │   │   ├── Products.jsx
    │   │   ├── Rates.css
    │   │   ├── Rates.jsx
    │   │   ├── Sales.css
    │   │   ├── Sales.jsx
    │   │   ├── Sessions.css
    │   │   └── Sessions.jsx
    │   ├── App.css
    │   ├── App.jsx
    │   ├── index.css
    │   ├── main.jsx
    │   ├── Layout.css
    │   └── Layout.jsx
    ├── .eslintrc.cjs (ESLint configuration)
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── README.md
```

## 🔗 API Reference (Backend)

The backend is built using FastAPI, exposing RESTful API endpoints for all major functionalities.

-   **`/products`**
    -   `POST /`: Create a new product.
    -   `GET /`: Get all active products.
    -   `GET /{product_id}`: Get a specific product by ID.
    -   `PUT /{product_id}`: Update a product.
    -   `DELETE /{product_id}`: Deactivate a product.

-   **`/consoles`**
    -   `POST /`: Create a new console.
    -   `GET /`: Get all available and occupied consoles.
    -   `GET /{console_id}`: Get a specific console by ID.
    -   `PUT /{console_id}`: Update a console's name or status.
    -   `DELETE /{console_id}`: Mark a console as inactive.

-   **`/rates`**
    -   `POST /`: Create a new rate.
    -   `GET /`: Get all active rates.
    -   `GET /{rate_id}`: Get a specific rate by ID.
    -   `PUT /{rate_id}`: Update a rate.
    -   `DELETE /{rate_id}`: Mark a rate as inactive.

-   **`/sessions`**
    -   `POST /start`: Start a new session.
    -   `POST /{session_id}/end`: End an active session and calculate total price.
    -   `GET /`: Get all sessions (active and finished).
    -   `GET /active/`: Get only active sessions.

-   **`/sales`**
    -   `POST /`: Create a new sale with products and quantities.
    -   `GET /`: Get all sales.
    -   `GET /{sale_id}`: Get a specific sale by ID, including details.

*For detailed request and response schemas, please refer to the Pydantic models in the `Backend/app/schemas/` directory.*

## 🤝 Contributing

Contributions are welcome! Please feel free to:

-   Fork the repository.
-   Create a new branch for your feature (`git checkout -b feature/AmazingFeature`).
-   Commit your changes (`git commit -m 'Add some AmazingFeature'`).
-   Push to the branch (`git push origin feature/AmazingFeature`).
-   Open a Pull Request.

## 📄 License

This project is not currently under any specified license.

## ⭐ Important Links

-   **Live Demo:** (Not available)
-   **Repository:** [https://github.com/PDR1004/cyber-management-system](https://github.com/PDR1004/cyber-management-system)

## 📝 Footer

© 2024 PDR1004. All rights reserved.

Repository: [cyber-management-system](https://github.com/PDR1004/cyber-management-system)
Author: PDR1004
Contact: [pdr1004@example.com](mailto:pdr1004@example.com)

**Love this project?** Star ⭐ | Fork 🍴 | Issue 🐛

---
**<p align="center">Generated by [ReadmeCodeGen](https://www.readmecodegen.com/)</p>**