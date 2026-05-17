import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

import { weeklyFoodSales } from "../../constants/dashboardContent";
import { useTheme } from "../../context/ThemeContext";
import { getThemeStyles } from "../../styles/themeStyles";

const TopSellingChart = () => {
    const { theme } = useTheme();

  const darkMode = theme === "dark";
  const styles = getThemeStyles(darkMode);
  return (
    <div className={`rounded-2xl shadow-sm border border-gray-100 p-5 w-full h-[420px] ${StyleSheet.card}`}>

      {/* Header */}
      <div className="mb-6">
        <h2 className={`text-xl font-heading text-gray-800 ${styles.heading}`}>
          Weekly Food Sales
        </h2>

        <p className="text-sm text-gray-400 font-body mt-1">
          Top selling items performance over the week
        </p>
      </div>

      {/* Chart */}
      <div className="w-full h-[320px]">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={weeklyFoodSales}>

            {/* Grid */}
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f1f5f9"
            />

            {/* X Axis */}
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: styles.labelAxis,
                fontSize: 12,
              }}
            />

            {/* Y Axis */}
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: styles.labelAxis,
                fontSize: 12,
              }}
            />

            <Tooltip />

            {/* Legend */}
            <Legend />

            {/* Pizza */}
            <Line
              type="monotone"
              dataKey="Pizza"
              stroke="#f97316"
              strokeWidth={3}
              dot={{ r: 4 }}
            />

            {/* Burger */}
            <Line
              type="monotone"
              dataKey="Burger"
              stroke="#38bdf8"
              strokeWidth={3}
              dot={{ r: 4 }}
            />

            {/* Pasta */}
            <Line
              type="monotone"
              dataKey="Pasta"
              stroke="#4ade80"
              strokeWidth={3}
              dot={{ r: 4 }}
            />

          </LineChart>

        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TopSellingChart;