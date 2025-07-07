# Funky Finds — Advanced React E-Commerce App

This project is part of my journey with the **Coding Temple Software Engineering Front-End Specialization**. It’s a fun, funky little e-commerce site built with React, TypeScript, Redux Toolkit, and React Query — basically a playground to practice some solid front-end skills with real-world tools.

---

## 📘 MODULE 2 KNOWLEDGE CHECK UPDATE

This project has been extended to include Firebase Authentication and Firestore functionality:

### 🔐 Authentication
- Users can register, log in, log out, and delete their accounts.
- Session persists on page refresh.

### 👤 User Profile
- Each user has a profile stored in Firestore (`users/{uid}`).
- Users can update their name and address.
- Delete Profile button removes both the Firestore document and Auth account.

### 🛒 Orders
- When users check out, orders are saved to `users/{uid}/orders/{orderId}`.
- The profile page displays previous orders.
- Each order links to a View Order page with item details and total.

### 📦 Firestore Products
- Logged-in users can create, update, and delete products in the `firestoreProducts` collection.
- Products are managed through a form and editable list on the Firestore Products page.


## Tech Stack

- **React + TypeScript** — typed, component-driven UI
- **Redux Toolkit** — to manage cart state easily and cleanly
- **React Query** — for smooth, declarative data fetching and caching
- **React Router** — navigating between pages
- **Bootstrap** — for quick, responsive styling
- **FakeStoreAPI** — my source for products and categories

---

## How to Run It Locally

1. Clone the repo:
    ```bash
    git clone https://github.com/CanterCode/ecommerce-site-funky-finds.git
    cd ecommerce-site-funky-finds
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Start the dev server:
    ```bash
    npm run dev
    ```

4. Open your browser to the URL shown (usually http://localhost:5173).

---

## What You Can Do

- Browse all products right on the homepage.
- Use the category dropdown to filter products dynamically.
- Add items to your cart directly from the product list.
- Click the cart icon to see what’s inside, update quantities, or remove items.
- Checkout to clear your cart and get a confirmation popup.
- The cart state sticks around thanks to session storage — so no surprises when you reload!

---

## 🚀 Deployment & Testing Overview

### 🌐 Live Site  
Visit the deployed app here:  
🔗 [https://ecommerce-site-funky-finds.vercel.app/](https://ecommerce-site-funky-finds.vercel.app/)

---

## ✅ CI/CD with GitHub Actions + Vercel

This project uses a **combined Continuous Integration and Deployment (CI/CD)** workflow powered by **GitHub Actions** and **Vercel**.

### 🔧 Continuous Integration (CI)
- Automatically triggered on every push or pull request to the `main` branch.
- Runs a full test suite using **Jest** and **React Testing Library**.
- If any tests fail, the pipeline will **fail immediately** and **prevent deployment**.

### 🚀 Continuous Deployment (CD)
- If tests pass, the app is **automatically deployed** to Vercel using the **Vercel CLI**.
- Ensures that only verified, working code is pushed to production.
- Redundant or separate deploy workflows (e.g., `deploy.yml`) have been removed to maintain a clean CI/CD pipeline.

---

## 🧪 Tests Included

This project includes the following unit and integration tests:

### 1. Register Form Validation (Unit Test)
- Validates form input rules including:
  - Required field handling
  - Password mismatch logic
  - Displaying error messages

### 2. Navbar Rendering (Unit Test)
- Ensures proper rendering of navigation elements:
  - Logo, links, and user state-driven UI behavior

### 3. Cart Integration Test
- Full integration test covering:
  - Adding a product to cart
  - Updating quantity via "+" and "-" buttons
  - Removing the item from the cart
  - Verifying UI reflects Redux state accurately at each step

These tests are automatically triggered by the GitHub Actions pipeline and must pass before code is deployed.

---

## 📦 Tech Stack
- React + TypeScript
- Redux Toolkit
- Firebase (Auth + Firestore)
- React Bootstrap
- Vercel for deployment
- GitHub Actions for CI/CD


---

## Final Thoughts

This project was a great way for me to put together some important React ecosystem tools and get comfortable with Redux Toolkit and React Query. Plus, working with an API like FakeStoreAPI made it feel more like a real world project and less like a “toy."
