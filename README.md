# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.




# 🍔 Food Admin Dashboard

A modern, responsive, and fully customizable **Restaurant & Food Delivery Admin Dashboard** built using **React, Tailwind CSS, and Vite**.

Designed for:
- Restaurants
- Food Delivery Businesses
- Cloud Kitchens
- Admin Management Systems
- Food Ordering Platforms

---

# ✨ Features

## 📊 Dashboard Analytics
- Revenue overview
- Sales statistics
- Total orders
- Pending orders
- Recent activities
- Charts & analytics widgets

---

## 🧾 Orders Management
- Order listing
- Order tracking
- Order status update
- Search & filters
- Pagination support
- Order details modal

---

## 🍔 Menu Management
- Add/Edit/Delete food items
- Categories management
- Product cards
- Pricing display
- Food image support
- Responsive menu layout

---

## 👥 Customer Management
- Customer list
- Customer information
- Search customers
- Pagination support
- Order history UI

---

## 🚚 Delivery Management
- Delivery rider management
- Active/Suspended riders
- Rider details modal
- Earnings tracking
- Vehicle details
- Ratings & reviews UI

---

## 💳 Payments & Transactions
- Transaction history
- Revenue tracking
- Payment status
- Search & filter transactions

---

## 🌙 Dark Mode Support
- Fully responsive dark mode
- Theme-aware cards
- Theme-aware tables
- Sidebar dark mode
- Smooth theme switching

---

## 📱 Responsive Design
Fully optimized for:
- Mobile devices
- Tablets
- Laptops
- Desktop screens

Built using Tailwind CSS responsive utilities.

---

# 🛠️ Tech Stack

| Technology | Version |
|------------|----------|
| React | Latest |
| Vite | Latest |
| Tailwind CSS | Latest |
| React Router DOM | Latest |
| React Hook Form | Latest |
| Lucide React Icons | Latest |

---

# 📂 Folder Structure

```bash
src/
├── assets/
│
├── components/
│   ├── common/
│   │   ├── CommonButton.jsx
│   │   ├── CommonEntriesSelect.jsx
│   │   ├── CommonPagination.jsx
│   │   ├── CommonSearch.jsx
│   │   ├── CommonStatsCard.jsx
│   │   ├── CommonTable.jsx
│   │   └── Modal.jsx
│   │
│   ├── dashboard/
│   │   ├── ActiveCustomersCard.jsx
│   │   ├── DashboardData.jsx
│   │   ├── OrdersTableSection.jsx
│   │   ├── RecentOrderCard.jsx
│   │   ├── Stats.jsx
│   │   └── TopSellingChart.jsx
│   │
│   ├── Header.jsx
│   └── Sidebar.jsx
│
├── constants/
│   ├── customerpage.js
│   ├── dashboardContent.js
│   ├── deliveryData.js
│   ├── headerData.js
│   ├── menupage.js
│   └── paymentpage.js
│
├── context/
│   └── ThemeContext.jsx
│
├── layouts/
│   └── MainLayout.jsx
│
├── pages/
│   ├── CustomerPage.jsx
│   ├── Dashboard.jsx
│   ├── DeliveryBoyPage.jsx
│   ├── MenuPage.jsx
│   ├── OrdersPage.jsx
│   ├── PaymentPage.jsx
│   └── SettingsPage.jsx
│
├── styles/
│   ├── themeStyles.js
│   └── App.css
│
├── App.jsx
└── main.jsx
```
```

---

# ⚙️ Installation Guide

## 1️⃣ Clone Repository

```bash
git clone your-repository-link
```

---

## 2️⃣ Open Project Folder

```bash
cd food-admin-dashboard
```

---

## 3️⃣ Install Dependencies

```bash
npm install
```

---

## 4️⃣ Start Development Server

```bash
npm run dev
```

Application will run on:

```bash
http://localhost:5173
```

---

# 🏗️ Production Build

Create optimized production build:

```bash
npm run build
```

---

# 👀 Preview Production Build

```bash
npm run preview
```

---

# 🎨 Tailwind CSS Configuration

Tailwind CSS configuration file:

```bash
tailwind.config.js
```

You can customize:
- Colors
- Fonts
- Breakpoints
- Spacing
- Shadows
- Animations

---

# 🌙 Theme System

Dynamic light and dark mode support included.

Theme configuration handled using:

```bash
context/ThemeContext
styles/themeStyles.js
```

Customizable theme options:
- Sidebar colors
- Background colors
- Text colors
- Card styles
- Table styles

---

# 📌 Sidebar Features

- Responsive sidebar
- Mobile sidebar toggle
- Collapsible desktop sidebar
- Active route highlighting
- Theme-aware hover effects

---

# ♻️ Reusable Components

## CommonButton
Reusable button component with multiple variants.

---

## CommonTable
Responsive reusable table component with:
- Scroll support
- Custom rendering
- Theme support
- Responsive layout

---

## CommonStatsCard
Reusable analytics/statistics card component.

---

## CommonPagination
Reusable pagination component.

---

## CommonSearch
Reusable search component.

---

## Modal
Reusable modal popup component.

---

# 🧩 Pages Included

- Dashboard
- Orders
- Menu Management
- Customers
- Delivery Management
- Payments
- Settings

---


### Build Command

```bash
npm install
then  npm run build
```

### Publish Directory

```bash
dist
```

---

## Deploy on Railway

Recommended for:
- Backend APIs
- Full-stack applications
- Scalable deployments

---

# 🛠️ Customization Guide

## Change Sidebar Color

Update file:

```bash
styles/themeStyles.js
```

Example:

```js
sidebar: darkMode
 ? "bg-[#111C33] text-slate-100"
 : "bg-gray-100 text-gray-800"
```

---

## Add New Sidebar Menu

Inside Sidebar component:

```jsx
<SidebarItem
  icon={<Home />}
  label="Dashboard"
  to="/"
/>
```

---

## Add New Page

### Step 1
Create page inside:

```bash
src/pages/
```

### Step 2
Add route inside router configuration.

---

# 📈 Optimization Tips

Before production deployment:
- Run production build
- Remove unused files
- Optimize images
- Verify responsiveness
- Check dark mode UI
- Remove console logs


---

# 📦 Included Files

- Full Source Code
- Documentation
- Reusable Components
- Responsive Layouts
- Dark Mode Support

---

# 🙌 Credits

Libraries & Tools Used:
- React
- Tailwind CSS
- Vite
- React Router DOM
- React Hook Form
- Lucide React Icons

---

# 📞 Support

If you face any issues with installation or customization, feel free to contact support.

---

# ⭐ Thank You

Thank you for purchasing **Food Admin Dashboard**.

If you like this project, please consider giving a positive rating on ThemeForest ⭐
