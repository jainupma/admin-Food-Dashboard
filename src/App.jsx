import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import OrdersPage from "./pages/OrdersPage";
import MenuPage from "./pages/MenuPage";
import CustomerPage from "./pages/CustomerPage";
import PaymentPage from "./pages/PaymentPage";
import SettingsPage from "./pages/SettingsPage";
import DeliveryBoyPage from "./pages/DeliveryBoyPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Layout Route */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="customers" element={<CustomerPage />} />
          <Route path="transaction" element={<PaymentPage />} />
          <Route path="delivery" element={<DeliveryBoyPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;