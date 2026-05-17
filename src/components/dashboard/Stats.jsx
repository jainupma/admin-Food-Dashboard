import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

import { statsData } from "../../constants/dashboardContent";
import { useTheme } from "../../context/ThemeContext";
import { getThemeStyles } from "../../styles/themeStyles";

const COLORS = [
  "#f97316",
  "#fb7185",
  "#38bdf8",
  "#4ade80",
];

const Stats = () => {
    const { theme } = useTheme();

  const darkMode = theme === "dark";
  const styles = getThemeStyles(darkMode);
  return (
    <div className={`rounded-2xl shadow-sm border border-gray-100 p-4 w-full ${styles.card}`}>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-lg md:text-xl font-heading text-gray-800 ${styles.heading}`}>
          Sales Overview
        </h2>
      </div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

        {/* Chart */}
        <div className="w-full lg:w-[60%] h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>

              <Pie
                data={statsData}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius="50%"
                outerRadius="75%"
                cornerRadius={5}
                paddingAngle={0}

                
                labelLine={false}
              >
                {statsData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="w-full lg:w-[40%] space-y-4">

          {statsData.map((item, index) => (
            <div
              key={index}
              className={`flex items-center justify-between  rounded-xl px-4 py-3 ${styles.card}`}
            >
              {/* Left */}
              <div className="flex items-center gap-3">

                {/* Color Dot */}
                <div
                  className="w-4 h-4 rounded-full"
                  style={{
                    backgroundColor:
                      COLORS[index % COLORS.length],
                  }}
                />

                {/* Title */}
                <span className={`text-sm font-body text-gray-700 ${styles.heading}`}>
                  {item.title}
                </span>
              </div>

              {/* Value */}
              <span className={`text-sm font-semibold text-gray-800 ${styles.label}`}>
                {item.value}
              </span>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default Stats;