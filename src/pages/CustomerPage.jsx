"use client";

import { useMemo, useState } from "react";

import {
  Filter,
  Eye,
  Ban,
  User,
  Phone,
  Truck,
} from "lucide-react";

import CommonTable from "../components/common/CommonTable";
import CommonPagination from "../components/common/CommonPagination";
import CommonSearch from "../components/common/CommonSearch";
import CommonButton from "../components/common/CommonButton";

import { customersData } from "../constants/customerpage";
import { useTheme } from "../context/ThemeContext";
import { getThemeStyles } from "../styles/themeStyles";
import CommonStatsCard from "../components/common/CommonStatsCard";

const customerColumns = [
  { header: "Customer", accessor: "customer" },
  { header: "Contact", accessor: "contact" },
  { header: "Orders", accessor: "orders" },
  { header: "Spent", accessor: "spent" },
  { header: "Status", accessor: "status" },
  { header: "Last Delivery", accessor: "delivery" },
  { header: "Action", accessor: "action" },
];

const CustomerPage = () => {

    const { theme } = useTheme();

  const darkMode = theme === "dark";
  const styles = getThemeStyles(darkMode);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // ================= FILTER =================
  const filteredCustomers = useMemo(() => {
    return customersData.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ? true : c.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  // ================= PAGINATION =================
  const totalPages = Math.max(
    1,
    Math.ceil(filteredCustomers.length / entriesPerPage)
  );

  const startIndex = (currentPage - 1) * entriesPerPage;

  const paginatedData = filteredCustomers.slice(
    startIndex,
    startIndex + entriesPerPage
  );

  // ================= STATS =================
  const totalCustomers = customersData.length;

  const activeCustomers = useMemo(
    () => customersData.filter((c) => c.status === "Active").length,
    []
  );

  const inactiveCustomers = useMemo(
    () => customersData.filter((c) => c.status === "Inactive").length,
    []
  );

  return (
    <div className={`min-h-screen p-6 ${styles.page}`}>

      {/* ================= HEADER ================= */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

        <div>
          <h1 className={`text-3xl font-bold text-gray-800 ${styles.heading}`}>
            Customer Management
          </h1>

          <p className="text-gray-400 mt-2">
            Manage customers and delivery assignments
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">

          <CommonSearch
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search customers..."
            className="w-full sm:w-[280px]"
          />

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
              className="pl-10 pr-8 py-3 rounded-xl border border-gray-200 bg-white outline-none text-gray-400"
            >
              <option>All</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>

          </div>

        </div>
      </div>

      {/* ================= STATS (UPDATED CLEAN UI) ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <CommonStatsCard
        title="Total Customers"
        value={totalCustomers}
        icon={<User size={24} />}
          iconBg="bg-orange-100"
          iconColor="text-orange-500"
        />

         <CommonStatsCard
        title="Active Customers"
        value={activeCustomers}
        icon={<User size={24} />}
          iconBg="bg-orange-100"
          iconColor="text-orange-500"
        />

         <CommonStatsCard
        title="Inactive Customers"
        value={inactiveCustomers}
        icon={<User size={24} />}
          iconBg="bg-orange-100"
          iconColor="text-orange-500"
        />
      </div>

      {/* ================= ENTRIES SELECTOR ================= */}
      <div className="flex items-center justify-between mb-4">

        <div className="flex items-center gap-3">

          <p className="text-sm text-gray-500">
            Show
          </p>

          <select
            value={entriesPerPage}
            onChange={(e) => {
              setEntriesPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-4 py-2 rounded-xl border border-gray-200 text-gray-400 text-sm outline-none focus:ring-2 focus:ring-orange-100"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>

          <p className="text-sm text-gray-500">
            entries
          </p>

        </div>

      </div>

      {/* ================= TABLE ================= */}
      <div className="p-2">

        <CommonTable
          title="All Customers"
          columns={customerColumns}
          data={paginatedData}
          renderCell={(accessor, row) => {

            if (accessor === "customer") {
              return (
                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center">
                    <User size={18} />
                  </div>

                  <div>
                    <p className={`font-semibold text-gray-800 ${styles.label}`}>
                      {row.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {row.email}
                    </p>
                  </div>

                </div>
              );
            }

            if (accessor === "contact") {
              return (
                <p className={`flex items-center gap-1 text-sm text-gray-600 ${styles.label}`}>
                  <Phone size={14} /> {row.phone}
                </p>
              );
            }

            if (accessor === "delivery") {
              return (
                <div className="text-sm">

                  <p className="flex items-center gap-2 font-medium">
                    <Truck size={14} className="text-orange-500" />
                    {row.delivery?.boyName}
                  </p>

                  <p className="text-xs text-gray-400">
                    ID: {row.delivery?.boyId}
                  </p>

                </div>
              );
            }

            if (accessor === "status") {
              return (
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  row.status === "Active"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}>
                  {row.status}
                </span>
              );
            }

            if (accessor === "action") {
              return (
                <CommonButton
                  variant="red"
                  icon={<Ban size={14} />}
                >
                  Block
                </CommonButton>
              );
            }

            return row[accessor];
          }}
        />

      </div>

      {/* ================= PAGINATION ================= */}
      <div className="mt-6">
        <CommonPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

    </div>
  );
};

export default CustomerPage;