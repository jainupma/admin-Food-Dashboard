"use client";

import { useMemo, useState } from "react";

import {
  Filter,
  Package2,
  Clock3,
  Truck,
  CircleCheckBig,
  Eye,
  Check,
  X,
} from "lucide-react";

import { ordersData } from "../constants/dashboardContent";

import CommonTable from "../components/common/CommonTable";
import CommonPagination from "../components/common/CommonPagination";
import CommonSearch from "../components/common/CommonSearch";
import CommonButton from "../components/common/CommonButton";
import CommonStatsCard from "../components/common/CommonStatsCard";
import { useTheme } from "../context/ThemeContext";
import { getThemeStyles } from "../styles/themeStyles";

const orderColumns = [
  {
    header: "Order ID",
    accessor: "id",
  },
  {
    header: "Customer",
    accessor: "customer",
  },
  {
    header: "Items",
    accessor: "items",
  },
  {
    header: "Amount",
    accessor: "amount",
  },
  {
    header: "Status",
    accessor: "status",
  },
  {
    header: "Action",
    accessor: "action",
  },
];

const OrdersPage = () => {
  const { theme } = useTheme();

  const darkMode = theme === "dark";
  const styles = getThemeStyles(darkMode);
  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);

  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // ================= FILTERED ORDERS =================
  const filteredOrders = useMemo(() => {
    return ordersData.filter((order) => {
      const matchesSearch =
        order.customer.toLowerCase().includes(search.toLowerCase()) ||
        order.id.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ? true : order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  // ================= PAGINATION =================
  const totalPages = Math.max(
    1,
    Math.ceil(filteredOrders.length / entriesPerPage),
  );

  const startIndex = (currentPage - 1) * entriesPerPage;

  const paginatedOrders = filteredOrders.slice(
    startIndex,
    startIndex + entriesPerPage,
  );

  // ================= STATS =================
  const totalOrders = ordersData.length;

  const pendingOrders = ordersData.filter(
    (order) => order.status === "Pending",
  ).length;

  const preparingOrders = ordersData.filter(
    (order) => order.status === "Preparing",
  ).length;

  const deliveredOrders = ordersData.filter(
    (order) => order.status === "Delivered",
  ).length;

  return (
    // <div className="min-h-screen bg-[#f8fafc] p-6 overflow-hidden">
    <div
      className={`min-h-screen w-full p-4 sm:p-6 overflow-x-hidden ${styles.page}`}
    >
      {/* ================= HEADER ================= */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
        {/* LEFT */}
        <div>
          <h1
            className={`text-3xl md:text-4xl font-bold text-gray-800 tracking-tight ${styles.heading}`}
          >
            Orders Management
          </h1>

          <p className="text-gray-400 mt-2 text-sm md:text-base">
            Track and manage all food orders
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* SEARCH */}
          <CommonSearch
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search orders..."
            className="w-full sm:w-[280px]"
          />

          {/* FILTER */}
          <div className="relative">
            <Filter
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 pr-10 py-3 rounded-2xl border border-gray-200 bg-white outline-none appearance-none cursor-pointer focus:border-orange-300 focus:ring-4 focus:ring-orange-100 transition-all text-gray-400"
            >
              <option>All</option>
              <option>Pending</option>
              <option>Preparing</option>
              <option>Delivered</option>
            </select>
          </div>
        </div>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <CommonStatsCard
          title="Total Orders"
          value={totalOrders}
          icon={<Package2 size={24} />}
          iconBg="bg-orange-100"
          iconColor="text-orange-500"
        />

        <CommonStatsCard
          title="Pending"
          value={pendingOrders}
          icon={<Clock3 size={24} />}
          iconBg="bg-orange-100"
          iconColor="text-orange-500"
        />

        <CommonStatsCard
          title="Preparing"
          value={preparingOrders}
          icon={<Truck size={24} />}
          iconBg="bg-orange-100"
          iconColor="text-orange-500"
        />

        <CommonStatsCard
          title="Delivered"
          value={deliveredOrders}
          icon={<CircleCheckBig size={24} />}
          iconBg="bg-orange-100"
          iconColor="text-orange-500"
        />
      </div>

      {/* ================= ENTRIES ================= */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <p className="text-sm text-gray-500">Show</p>

          <select
            value={entriesPerPage}
            onChange={(e) => {
              setEntriesPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-4 py-2 rounded-xl border border-gray-200 text-gray-400 text-sm outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-300"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>

          <p className="text-sm text-gray-500">entries</p>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="w-full min-w-0">
        <CommonTable
          title="All Orders"
          columns={orderColumns}
          data={paginatedOrders}
          minWidth="1200px"
          renderCell={(accessor, row) => {
            if (accessor === "status") {
              return (
                <span
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${
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

            if (accessor === "action") {
              return (
                <div className="flex items-center gap-2 min-w-max">
                  <CommonButton variant="orange" icon={<Eye size={15} />}>
                    View
                  </CommonButton>

                  <CommonButton variant="green" icon={<Check size={15} />}>
                    Accept
                  </CommonButton>

                  <CommonButton variant="red" icon={<X size={15} />}>
                    Reject
                  </CommonButton>
                </div>
              );
            }

            return row[accessor];
          }}
        />
      </div>

      {/* ================= PAGINATION ================= */}
      <CommonPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default OrdersPage;
