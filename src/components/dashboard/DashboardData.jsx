import { ordersData, statsData } from "../../constants/dashboardContent";
import { motion } from "framer-motion";
import Stats from "./Stats";
import TopSellingChart from "./TopSellingChart";
import RecentOrderCard from "./RecentOrderCard";
import OrdersTableSection from "./OrdersTableSection";
import ActiveCustomersCard from "./ActiveCustomersCard";
import { useTheme } from "../../context/ThemeContext";
import { getThemeStyles } from "../../styles/themeStyles";

const DashboardData = () => {
  
    const { theme } = useTheme();
  
    const darkMode = theme === "dark";
    const styles = getThemeStyles(darkMode);
  return (
    <div className={`w-full px-10 ${styles.page} pt-10 `}>

      <div className="flex flex-col xl:flex-row gap-10">

        {/* Stats Section */}
        <div className="flex-1">
          <Stats />
        </div>

        {/* Orders Table */}
        <div className="w-full xl:w-[35%]">
          <RecentOrderCard />
          <ActiveCustomersCard/>
        </div>

      </div>

   <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 mt-6">

  <div className="xl:col-span-5 flex flex-col gap-6">

    {/* Weekly Chart */}
    <div className="flex-1">
      <TopSellingChart />
    </div>

    {/* Orders Table */}
    <div className="flex-1">
      <OrdersTableSection />
    </div>

  </div>

</div>

</div>

  );
};

export default DashboardData;
