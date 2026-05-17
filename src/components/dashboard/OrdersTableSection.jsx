import CommonTable from "../common/CommonTable";
import { orderColumns, ordersData } from "../../constants/dashboardContent";
import { useTheme } from "../../context/ThemeContext";
import { getThemeStyles } from "../../styles/themeStyles";

const OrdersTableSection = () => {
    const { theme } = useTheme();

  const darkMode = theme === "dark";
  const styles = getThemeStyles(darkMode);
  return (
    <div>

      <CommonTable
        title="Recent Orders"
        columns={orderColumns}
        data={ordersData}
        viewAllLink="/orders"
        renderCell={(accessor, row) => {

          // Custom UI per column
          if (accessor === "status") {
            return (
              <span
                className={`px-3 py-1 text-xs rounded-full font-medium ${
                  row.status === "Delivered"
                    ? "bg-green-100 text-green-600"
                    : row.status === "Preparing"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {row.status}
              </span>
            );
          }

          if (accessor === "amount") {
            return (
              <span className={`font-semibold text-gray-800 ${styles.label}`}>
                {row.amount}
              </span>
            );
          }

          if (accessor === "id") {
            return (
              <span className={`font-medium text-gray-700 ${styles.label}`}>
                {row.id}
              </span>
            );
          }

          return row[accessor];
        }}
      />

    </div>
  );
};

export default OrdersTableSection;