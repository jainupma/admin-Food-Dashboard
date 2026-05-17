"use client";

import { useMemo, useState } from "react";

import {
  Search,
  Filter,
  Wallet,
  IndianRupee,
  CircleDollarSign,
  Clock3,
  CheckCircle2,
  XCircle,
  CreditCard,
  Smartphone,
  Eye,
} from "lucide-react";

import CommonTable from "../components/common/CommonTable";
import CommonPagination from "../components/common/CommonPagination";
import CommonSearch from "../components/common/CommonSearch";
import CommonButton from "../components/common/CommonButton";
import CommonStatsCard from "../components/common/CommonStatsCard";

import { paymentsData } from "../constants/paymentpage";
import { useTheme } from "../context/ThemeContext";
import { getThemeStyles } from "../styles/themeStyles";

// ================= TABLE COLUMNS =================
const paymentColumns = [
  { header: "Transaction", accessor: "transaction" },
  { header: "Customer", accessor: "customer" },
  { header: "Method", accessor: "method" },
  { header: "Amount", accessor: "amount" },
  { header: "Status", accessor: "status" },
  { header: "Date", accessor: "date" },
  { header: "Action", accessor: "action" },
];

const PaymentPage = () => {
   const { theme } = useTheme();

  const darkMode = theme === "dark";
  const styles = getThemeStyles(darkMode);
  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [entriesPerPage, setEntriesPerPage] =
    useState(10);

  // ================= FILTER =================
  const filteredPayments = useMemo(() => {
    return paymentsData.filter((payment) => {

      const matchesSearch =
        payment.customer
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        payment.transactionId
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All"
          ? true
          : payment.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  // ================= PAGINATION =================
  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredPayments.length / entriesPerPage
    )
  );

  const startIndex =
    (currentPage - 1) * entriesPerPage;

  const paginatedPayments =
    filteredPayments.slice(
      startIndex,
      startIndex + entriesPerPage
    );

  // ================= STATS =================
  const totalPayments = paymentsData.length;

  const successfulPayments =
    paymentsData.filter(
      (p) => p.status === "Paid"
    ).length;

  const pendingPayments =
    paymentsData.filter(
      (p) => p.status === "Pending"
    ).length;

  const totalRevenue = paymentsData
    .filter((p) => p.status === "Paid")
    .reduce(
      (acc, item) =>
        acc + Number(item.amount.replace("₹", "")),
      0
    );

  return (
    <div className={`min-h-screen p-6 ${styles.page}`}>

      {/* ================= HEADER ================= */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

        {/* LEFT */}
        <div>

          <h1 className={`text-3xl font-bold ${styles.heading}`}>
            Payment Management
          </h1>

          <p className="text-gray-400 mt-2">
            Manage all transactions and payment
            history
          </p>

        </div>

        {/* RIGHT */}
        <div className="flex flex-col sm:flex-row gap-3">

          {/* SEARCH */}
          <CommonSearch
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search transactions..."
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
              className="pl-10 pr-8 py-3 rounded-xl border border-gray-200 bg-white outline-none text-gray-400"
            >
              <option>All</option>
              <option>Paid</option>
              <option>Pending</option>
              <option>Failed</option>
            </select>

          </div>

        </div>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

        <CommonStatsCard
          title="Total Transactions"
          value={totalPayments}
          icon={<Wallet size={26} />}
          iconBg="bg-orange-100"
          iconColor="text-orange-500"
        />

        <CommonStatsCard
          title="Successful Payments"
          value={successfulPayments}
          icon={<CheckCircle2 size={26} />}
          iconBg="bg-green-100"
          iconColor="text-green-500"
        />

        <CommonStatsCard
          title="Pending Payments"
          value={pendingPayments}
          icon={<Clock3 size={26} />}
          iconBg="bg-yellow-100"
          iconColor="text-yellow-600"
        />

        <CommonStatsCard
          title="Revenue"
          value={`₹${totalRevenue}`}
          icon={<IndianRupee size={26} />}
          iconBg="bg-blue-100"
          iconColor="text-blue-500"
        />

      </div>

      {/* ================= ENTRIES ================= */}
      <div className="flex items-center justify-between mb-5">

        <div className="flex items-center gap-3">

          <p className="text-sm text-gray-500">
            Show
          </p>

          <select
            value={entriesPerPage}
            onChange={(e) => {
              setEntriesPerPage(
                Number(e.target.value)
              );
              setCurrentPage(1);
            }}
            className="px-4 py-2 rounded-xl border border-gray-200 text-sm outline-none text-gray-400"
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
      <div className=" p-2">

        <CommonTable
          title="All Transactions"
          columns={paymentColumns}
          data={paginatedPayments}
          renderCell={(accessor, row) => {

            // TRANSACTION
            if (accessor === "transaction") {
              return (
                <div>

                  <p className={`font-semibold text-gray-800 ${styles.label}`}>
                    {row.transactionId}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    Order ID: {row.orderId}
                  </p>

                </div>
              );
            }

            // CUSTOMER
            if (accessor === "customer") {
              return (
                <div>

                  <p className={`font-medium text-gray-800 ${styles.label}`}>
                    {row.customer}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    {row.email}
                  </p>

                </div>
              );
            }

            // METHOD
            if (accessor === "method") {
              return (
                <div className={`flex items-center gap-2 text-sm font-medium ${styles.label}`}>

                  {row.method === "UPI" ? (
                    <Smartphone
                      size={16}
                      className="text-purple-500"
                    />
                  ) : (
                    <CreditCard
                      size={16}
                      className="text-blue-500"
                    />
                  )}

                  {row.method}

                </div>
              );
            }

            // AMOUNT
            if (accessor === "amount") {
              return (
                <span className={`font-semibold text-gray-800 ${styles.label}`}>
                  {row.amount}
                </span>
              );
            }

            // STATUS
            if (accessor === "status") {
              return (
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    row.status === "Paid"
                      ? "bg-green-100 text-green-600"
                      : row.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {row.status}
                </span>
              );
            }

            // DATE
            if (accessor === "date") {
              return (
                <span className={`text-sm text-gray-600 ${styles.label}`}>
                  {row.date}
                </span>
              );
            }

            // ACTION
            if (accessor === "action") {
              return (
                <div className="flex items-center gap-2">

                  <CommonButton
                    variant="orange"
                    icon={<Eye size={14} />}
                  >
                    View
                  </CommonButton>

                  {row.status === "Failed" && (
                    <CommonButton
                      variant="red"
                      icon={<XCircle size={14} />}
                    >
                      Retry
                    </CommonButton>
                  )}

                </div>
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

export default PaymentPage;