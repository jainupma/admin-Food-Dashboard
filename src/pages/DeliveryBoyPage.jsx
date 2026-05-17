"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { getThemeStyles } from "../styles/themeStyles";

import {
  Filter,
  User,
  Phone,
  Star,
  Bike,
  MapPin,
  Eye,
  Ban,
  CheckCircle2,
  Plus,
  Mail,
  Wallet,
} from "lucide-react";

import Modal from "../components/common/Modal";
import CommonSearch from "../components/common/CommonSearch";
import CommonPagination from "../components/common/CommonPagination";
import CommonTable from "../components/common/CommonTable";
import CommonStatsCard from "../components/common/CommonStatsCard";
import CommonButton from "../components/common/CommonButton";

// ================= SAMPLE DATA =================
import { deliveryBoysData } from "../constants/deliveryData";
import { useTheme } from "../context/ThemeContext";

const deliveryColumns = [
  { header: "Delivery Boy", accessor: "deliveryBoy" },
  { header: "Contact", accessor: "contact" },
  { header: "Vehicle", accessor: "vehicle" },
  { header: "Orders", accessor: "orders" },
  { header: "Earnings", accessor: "earnings" },
  { header: "Rating", accessor: "rating" },
  { header: "Status", accessor: "status" },
  { header: "Action", accessor: "action" },
];

const DeliveryBoyPage = () => {
  // ================= STATES =================
    const { theme } = useTheme();
  
    const darkMode = theme === "dark";
    const styles = getThemeStyles(darkMode);
  const [deliveryBoys, setDeliveryBoys] = useState(deliveryBoysData);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // ================= MODALS =================
  const [openModal, setOpenModal] = useState(false);
  const [selectedBoy, setSelectedBoy] = useState(null);

  const [addModal, setAddModal] = useState(false);

  // ================= REACT HOOK FORM =================
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      vehicle: "",
      vehicleNo: "",
      area: "",
    },
  });

  // ================= VIEW DELIVERY BOY =================
  const handleView = (boy) => {
    setSelectedBoy(boy);
    setOpenModal(true);
  };

  // ================= ADD DELIVERY BOY =================
  const onSubmit = (data) => {
    const newDeliveryBoy = {
      id: `DB${deliveryBoys.length + 1}`,
      name: data.name,
      phone: data.phone,
      email: data.email,
      vehicle: data.vehicle,
      vehicleNo: data.vehicleNo,
      area: data.area,
      deliveriesToday: 0,
      earnings: "₹0",
      rating: 5,
      status: "Active",
    };

    setDeliveryBoys((prev) => [newDeliveryBoy, ...prev]);

    reset();

    setAddModal(false);
  };

  // ================= TOGGLE STATUS =================
  const toggleStatus = (id) => {
    setDeliveryBoys((prev) =>
      prev.map((boy) =>
        boy.id === id
          ? {
              ...boy,
              status:
                boy.status === "Suspended"
                  ? "Active"
                  : "Suspended",
            }
          : boy
      )
    );

    if (selectedBoy?.id === id) {
      setSelectedBoy((prev) => ({
        ...prev,
        status:
          prev.status === "Suspended"
            ? "Active"
            : "Suspended",
      }));
    }
  };

  // ================= FILTER =================
  const filteredData = useMemo(() => {
    return deliveryBoys.filter((boy) => {
      const matchesSearch =
        boy.name.toLowerCase().includes(search.toLowerCase()) ||
        boy.id.toLowerCase().includes(search.toLowerCase()) ||
        boy.phone.includes(search);

      const matchesStatus =
        statusFilter === "All"
          ? true
          : boy.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter, deliveryBoys]);

  // ================= PAGINATION =================
  const totalPages = Math.max(
    1,
    Math.ceil(filteredData.length / entriesPerPage)
  );

  const startIndex = (currentPage - 1) * entriesPerPage;

  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + entriesPerPage
  );

  return (
   <div className={`min-h-screen p-2 sm:p-4 lg:p-6 overflow-hidden ${styles.page}`}>
      {/* ================= HEADER ================= */}
      <div className={`flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 mb-8`}>
        <div>
          <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 ${styles.heading}`}>
            Delivery Management
          </h1>

          <p className="text-sm sm:text-base text-gray-400 mt-2">
            Manage riders, deliveries and assignments
          </p>
        </div>

        <div className={`flex flex-col lg:flex-row gap-3 w-full xl:w-auto ${styles.search}`}>
          {/* SEARCH */}
          <CommonSearch
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search delivery boys..."
            className="w-full lg:w-[260px]"
          />

          {/* FILTER */}
          <div className="relative w-full lg:w-auto">
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
              className="w-full lg:w-auto pl-10 pr-8 py-3 rounded-xl border border-gray-200 bg-white outline-none text-sm text-gray-600"
            >
              <option>All</option>
              <option>Active</option>
              <option>Busy</option>
              <option>Offline</option>
              <option>Suspended</option>
            </select>
          </div>

          {/* ADD BUTTON */}
          <CommonButton
            variant="primary"
            icon={<Plus size={16} />}
            onClick={() => setAddModal(true)}
            className="w-full lg:w-auto"
          >
            Add Delivery Boy
          </CommonButton>
        </div>
      </div>

      {/* ================= STATS ================= */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 mb-6 sm:mb-8">
  
  <CommonStatsCard
    title="Total Riders"
    value={deliveryBoys.length}
    icon={<Bike className="w-5 h-5 sm:w-6 sm:h-6" />}
    iconBg="bg-orange-100"
    iconColor="text-orange-500"
  />

  <CommonStatsCard
    title="Active Riders"
    value={
      deliveryBoys.filter((d) => d.status === "Active").length
    }
    icon={
      <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
    }
    iconBg="bg-green-100"
    iconColor="text-green-500"
  />

  <CommonStatsCard
    title="Busy Riders"
    value={
      deliveryBoys.filter((d) => d.status === "Busy").length
    }
    icon={<MapPin className="w-5 h-5 sm:w-6 sm:h-6" />}
    iconBg="bg-yellow-100"
    iconColor="text-yellow-500"
  />

  <CommonStatsCard
    title="Suspended"
    value={
      deliveryBoys.filter((d) => d.status === "Suspended").length
    }
    icon={<Ban className="w-5 h-5 sm:w-6 sm:h-6" />}
    iconBg="bg-red-100"
    iconColor="text-red-500"
  />
</div>

      {/* ================= ENTRIES ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 flex-wrap">
          <p className="text-sm text-gray-500">Show</p>

          <select
            value={entriesPerPage}
            onChange={(e) => {
              setEntriesPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-4 py-2 rounded-xl border border-gray-200 text-md outline-none text-gray-400"
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
<div className={`rounded-3xl border border-gray-200 ${styles.card}`}>
  <CommonTable
  title="All Delivery Boys"
  columns={deliveryColumns}
  data={paginatedData}
  tableWrapperClass="overflow-x-auto"
  tableClass="min-w-[1000px]"
  renderCell={(accessor, row) => {
    // DELIVERY BOY
    if (accessor === "deliveryBoy") {
      return (
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
              <User
                size={18}
                className="text-orange-500"
              />
            </div>

            <div
              className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                row.status === "Active"
                  ? "bg-green-500"
                  : row.status === "Busy"
                  ? "bg-yellow-500"
                  : row.status === "Offline"
                  ? "bg-gray-400"
                  : "bg-red-500"
              }`}
            />
          </div>

          <div>
            <p className={`font-semibold whitespace-nowrap ${styles.label}`}>
              {row.name}
            </p>

            <p className="text-xs text-gray-400">
              {row.id}
            </p>
          </div>
        </div>
      );
    }

    // CONTACT
    if (accessor === "contact") {
      return (
        <div className="text-sm text-gray-600">
          <p className={`flex items-center gap-2 whitespace-nowrap ${styles.label}`}>
            <Phone size={14} />
            {row.phone}
          </p>

          <p className="text-xs text-gray-400 mt-1 break-all">
            {row.email}
          </p>
        </div>
      );
    }

    // VEHICLE
    if (accessor === "vehicle") {
      return (
        <div>
          <p className={`font-medium text-gray-700 whitespace-nowrap ${styles.label}`}>
            {row.vehicle}
          </p>

          <p className="text-xs text-gray-400">
            {row.vehicleNo}
          </p>
        </div>
      );
    }

    // ORDERS
    if (accessor === "orders") {
      return (
        <div>
          <p className={`font-semibold text-gray-800 ${styles.label}`}>
            {row.deliveriesToday}
          </p>

          <p className="text-xs text-gray-400">
            Today Deliveries
          </p>
        </div>
      );
    }

    // EARNINGS
    if (accessor === "earnings") {
      return (
        <p className="font-semibold text-green-600 whitespace-nowrap">
          {row.earnings}
        </p>
      );
    }

    // RATING
    if (accessor === "rating") {
      return (
        <div className="flex items-center gap-1 text-yellow-500 font-semibold">
          <Star size={16} fill="currentColor" />
          {row.rating}
        </div>
      );
    }

    // STATUS
    if (accessor === "status") {
      return (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
            row.status === "Active"
              ? "bg-green-100 text-green-600"
              : row.status === "Busy"
              ? "bg-yellow-100 text-yellow-600"
              : row.status === "Offline"
              ? "bg-gray-100 text-gray-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {row.status}
        </span>
      );
    }

    // ACTION
    if (accessor === "action") {
      return (
        <div className="flex flex-col xl:flex-row gap-2 min-w-[180px]">
          <CommonButton
            variant="orange"
            icon={<Eye size={14} />}
            onClick={() => handleView(row)}
            className="w-full xl:w-auto"
          >
            View
          </CommonButton>

          {row.status === "Suspended" ? (
            <CommonButton
              variant="green"
              icon={<CheckCircle2 size={14} />}
              onClick={() => toggleStatus(row.id)}
              className="w-full xl:w-auto"
            >
              Activate
            </CommonButton>
          ) : (
            <CommonButton
              variant="red"
              icon={<Ban size={14} />}
              onClick={() => toggleStatus(row.id)}
              className="w-full xl:w-auto"
            >
              Suspend
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
      <div className="mt-6 overflow-x-auto">
        <CommonPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* ================= VIEW MODAL ================= */}
      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        title="Delivery Boy Details"
        width="max-w-4xl"
      >
        {selectedBoy && (
          <div className="max-h-[80vh] overflow-y-auto pr-1">
            {/* PROFILE */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-5 pb-6 border-b border-gray-100">
              <div className="mx-auto lg:mx-0">
                <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center">
                  <User size={36} className="text-orange-500" />
                </div>
              </div>

              <div className="flex-1 text-center lg:text-left">
                <h2 className={`text-2xl font-bold text-gray-800 ${styles.heading}`}>
                  {selectedBoy.name}
                </h2>

                <p className="text-sm text-gray-400 mt-1">
                  Rider ID: {selectedBoy.id}
                </p>

                <div className="flex items-center justify-center lg:justify-start gap-2 mt-3 text-yellow-500 font-semibold">
                  <Star size={18} fill="currentColor" />
                  {selectedBoy.rating} Rating
                </div>
              </div>

              <div className="flex justify-center lg:justify-end">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    selectedBoy.status === "Active"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {selectedBoy.status}
                </span>
              </div>
            </div>

            {/* DETAILS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">
              {/* CONTACT */}
              <div className={`border border-gray-100 rounded-3xl p-5 ${styles.card}`}>
                <h3 className={`text-lg font-semibold text-gray-800 mb-4 ${styles.heading}`}>
                  Contact Details
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
                      <Phone
                        size={18}
                        className="text-orange-500"
                      />
                    </div>

                    <div>
                      <p className={`text-xs text-gray-400 ${styles.label}`}>
                        Phone Number
                      </p>

                      <p className="font-medium text-gray-700 break-all">
                        {selectedBoy.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                      <Mail size={18} className="text-blue-500" />
                    </div>

                    <div>
                      <p className={`text-xs text-gray-400 ${styles.label}`}>
                        Email Address
                      </p>

                      <p className="font-medium text-gray-700 break-all">
                        {selectedBoy.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* VEHICLE */}
              <div className={`border border-gray-100 rounded-3xl p-5 ${styles.card}`}>
                <h3 className={`text-lg font-semibold text-gray-800 mb-4 ${styles.heading}`}>
                  Vehicle Information
                </h3>

                <div className="space-y-4">
                  <div>
                    <p className={`text-xs text-gray-400 ${styles.label}`}>
                      Vehicle Type
                    </p>

                    <p className={`font-medium text-gray-700 ${styles.subtext}`}>
                      {selectedBoy.vehicle}
                    </p>
                  </div>

                  <div>
                    <p className={`text-xs text-gray-400 ${styles.label}`}>
                      Vehicle Number
                    </p>

                    <p className="font-medium text-gray-700">
                      {selectedBoy.vehicleNo}
                    </p>
                  </div>

                  <div>
                    <p className={`text-xs text-gray-400 ${styles.label}`}>
                      Assigned Area
                    </p>

                    <p className="font-medium text-gray-700">
                      {selectedBoy.area || "agra"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
              <CommonStatsCard
              title=" Deliveries Today"
          value={selectedBoy.deliveriesToday}
          icon={<Bike size={24} />}
          iconBg="bg-orange-100"
          iconColor="text-orange-500"
          />

             <CommonStatsCard
              title="Total Earnings"
          value={selectedBoy.earnings}
          icon={<Wallet size={24} />}
          iconBg="bg-orange-100"
          iconColor="text-orange-500"
          />
            </div>

            {/* ACTION */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8">
              {selectedBoy.status === "Suspended" ? (
                <CommonButton
                  variant="green"
                  icon={<CheckCircle2 size={15} />}
                  onClick={() => toggleStatus(selectedBoy.id)}
                  className="w-full sm:w-auto"
                >
                  Activate Rider
                </CommonButton>
              ) : (
                <CommonButton
                  variant="red"
                  icon={<Ban size={15} />}
                  onClick={() => toggleStatus(selectedBoy.id)}
                  className="w-full sm:w-auto"
                >
                  Suspend Rider
                </CommonButton>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* ================= ADD MODAL ================= */}
      <Modal
        isOpen={addModal}
        onClose={() => {
          setAddModal(false);
          reset();
        }}
        title="Add New Delivery Boy"
        width="max-w-2xl"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* NAME */}
            <div>
              <input
                type="text"
                placeholder="Full Name"
                {...register("name", {
                  required: "Name is required",
                })}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 outline-none focus:ring-4 focus:ring-orange-100"
              />

              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* PHONE */}
            <div>
              <input
                type="text"
                placeholder="Phone Number"
                {...register("phone", {
                  required: "Phone number is required",
                })}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 outline-none focus:ring-4 focus:ring-orange-100"
              />

              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <input
                type="email"
                placeholder="Email Address"
                {...register("email", {
                  required: "Email is required",
                })}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 outline-none focus:ring-4 focus:ring-orange-100"
              />

              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* VEHICLE */}
            <div>
              <input
                type="text"
                placeholder="Vehicle Type"
                {...register("vehicle", {
                  required: "Vehicle type is required",
                })}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 outline-none focus:ring-4 focus:ring-orange-100"
              />

              {errors.vehicle && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.vehicle.message}
                </p>
              )}
            </div>

            {/* VEHICLE NUMBER */}
            <div>
              <input
                type="text"
                placeholder="Vehicle Number"
                {...register("vehicleNo")}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 outline-none focus:ring-4 focus:ring-orange-100"
              />
            </div>

            {/* AREA */}
            <div>
              <input
                type="text"
                placeholder="Assigned Area"
                {...register("area")}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 outline-none focus:ring-4 focus:ring-orange-100"
              />
            </div>
          </div>

          {/* BUTTON */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8">
            <CommonButton
              type="button"
              variant="outline"
              onClick={() => {
                setAddModal(false);
                reset();
              }}
              className="w-full sm:w-auto"
            >
              Cancel
            </CommonButton>

            <CommonButton
              type="submit"
              variant="primary"
              icon={<Plus size={16} />}
              className="w-full sm:w-auto"
            >
              Add Delivery Boy
            </CommonButton>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default DeliveryBoyPage;