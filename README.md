# Distributed Order Aggregator System

A Node.js backend service that syncs stock data from multiple vendors and handles customer orders with strong consistency and high reliability using PostgreSQL and RabbitMQ. Designed for concurrency safety and fault-tolerant processing.

---

## Features

- Sync product stock from multiple vendors (via mock APIs)
- Store vendor stock in local PostgreSQL DB
- Process customer orders atomically
- Use RabbitMQ to ensure reliable, queue-based order handling
- Prevent double-selling under high load with database locking

---

## Tech Stack

- **Node.js** (Express)
- **PostgreSQL** (Row-level locking, transactions)
- **RabbitMQ** (Messaging Queue)
- **MVC Architecture**

---

## RabitMQ Run Docker
    $: docker run -d --hostname rabbitmq   --name rabbitmq   -p 5672:5672 -p 15672:15672   rabbitmq:3-management


## Project Structure

    src/
    ├── app.js # Main server entry
    ├── config/ # DB & MQ setup 
    ├── controllers/ # Express request handlers
    ├── models/ # Database interaction (stock, order)
    ├── routes/ # API endpoints
    ├── services/ # Business logic
    vendors/ # Mock vendor APIs
    workers/ # Order processing worker


## PostgreSQL Setup
Create two tables:

    CREATE TABLE stock (
        product_id TEXT PRIMARY KEY,
        quantity INTEGER NOT NULL
    );

    CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        product_id TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        status TEXT NOT NULL DEFAULT 'PENDING',
        created_at TIMESTAMP DEFAULT NOW()
    );


## Environment Variables
Create a .env file:
    
    PORT=3000

    DB_USER=username
    DB_PASSWORD=password
    DB_HOST=localhost
    DB_PORT=5432
    DB_NAME=mydb // Database name

    RABBITMQ_URL=amqp://guest:guest@localhost:5672




## Commands
    $:  npm  install
    $:  node  src/app.js
    $:  node  vendor-mocks/vendorA.js  //Demo Vendor Start
    $:  node  vendor-mocks/vendorB.js   //Demo Vendor Start
    $:  node  workers/orderWorker.js



## API Endpoints

    | Method | Endpoint            | Description            |
    | ------ | ------------------- | ---------------------- |
    | GET    | `api/v1/stock`      | Get all local stock    |
    | POST   | `api/v1/order`      | Place a new order      |
    | GET    | `api/v1/orders`     | List all orders        |
    | GET    | `api/v1/orders/:id` | Get specific order     |
    | PATCH  | `api/v1/orders/:id` | Manually update status |



