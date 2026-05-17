"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { menuData } from "../constants/menupage";
import { useTheme } from "../context/ThemeContext";
import { getThemeStyles } from "../styles/themeStyles";

import {
  Search,
  Filter,
  Plus,
  Pencil,
  Trash2,
  UtensilsCrossed,
  DollarSign,
  Tags,
  Star,
  UtensilsCrossedIcon,
} from "lucide-react";

import CommonTable from "../components/common/CommonTable";
import CommonPagination from "../components/common/CommonPagination";
import CommonSearch from "../components/common/CommonSearch";
import CommonButton from "../components/common/CommonButton";
import Modal from "../components/common/Modal";
import CommonStatsCard from "../components/common/CommonStatsCard";

// ================= TABLE COLUMNS =================
const menuColumns = [
  {
    header: "Item",
    accessor: "item",
  },
  {
    header: "Category",
    accessor: "category",
  },
  {
    header: "Price",
    accessor: "price",
  },
  {
    header: "Rating",
    accessor: "rating",
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

const MenuPage = () => {
  const { theme } = useTheme();

  const darkMode = theme === "dark";
  const styles = getThemeStyles(darkMode);

  const [search, setSearch] = useState("");

  const [categoryFilter, setCategoryFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);

  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      name: "",
      price: "",
      category: "",
      image: "",
    },
  });

  // ================= FILTER MENU =================
  const filteredMenu = useMemo(() => {
    return menuData.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        categoryFilter === "All" ? true : item.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [search, categoryFilter]);

  // ================= PAGINATION =================
  const totalPages = Math.max(
    1,
    Math.ceil(filteredMenu.length / entriesPerPage),
  );

  const startIndex = (currentPage - 1) * entriesPerPage;

  const paginatedMenu = filteredMenu.slice(
    startIndex,
    startIndex + entriesPerPage,
  );

  // ================= STATS =================
  const totalItems = menuData.length;

  const availableItems = menuData.filter(
    (item) => item.status === "Available",
  ).length;

  const categories = [...new Set(menuData.map((item) => item.category))].length;

  const onSubmit = (data) => {
    if (editMode) {
      console.log("UPDATE API CALL", {
        id: selectedItem.id,
        ...data,
      });
    } else {
      console.log("CREATE API CALL", data);
    }

    setIsModalOpen(false);
    reset();
  };

  return (
    <div className={`min-h-screen p-6 ${styles.page}`}>
      {/* ================= HEADER ================= */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
        {/* LEFT */}
        <div>
          <h1
            className={`text-3xl md:text-4xl font-bold text-gray-800 ${styles.heading}`}
          >
            Menu Management
          </h1>

          <p className="text-gray-400 mt-2">
            Manage all food items and categories
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
            placeholder="Search menu..."
            className="w-full sm:w-[280px]"
          />

          {/* FILTER */}
          <div className="relative">
            <Filter
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 pr-10 py-3 rounded-2xl border border-gray-200 bg-white outline-none appearance-none focus:ring-4 focus:ring-orange-100 text-gray-400"
            >
              <option>All</option>
              <option>Burger</option>
              <option>Pizza</option>
              <option>Pasta</option>
              <option>Snacks</option>
              <option>Starter</option>
            </select>
          </div>

          {/* ADD BUTTON */}
          <CommonButton
            variant="primary"
            icon={<Plus size={16} />}
            className="px-5"
            onClick={() => {
              setEditMode(false);
              setSelectedItem(null);
              reset();
              setIsModalOpen(true);
            }}
          >
            Add Item
          </CommonButton>
        </div>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <CommonStatsCard
          title="Total Items"
          value={totalItems}
          icon={<UtensilsCrossedIcon size={24} />}
          iconBg="bg-orange-100"
          iconColor="text-orange-500"
        />

        <CommonStatsCard
          title="Categories"
          value={categories}
          icon={<Tags size={24} />}
          iconBg="bg-orange-100"
          iconColor="text-orange-500"
        />

        <CommonStatsCard
          title=" Available Items"
          value={availableItems}
          icon={<DollarSign size={24} />}
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
            className="px-4 py-2 rounded-xl border border-gray-200 text-sm outline-none focus:ring-4 focus:ring-orange-100 text-gray-400"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>

          <p className="text-sm text-gray-500">entries</p>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <CommonTable
        title="All Menu Items"
        columns={menuColumns}
        data={paginatedMenu}
        renderCell={(accessor, row) => {
          // ITEM
          if (accessor === "item") {
            return (
              <div className="flex items-center gap-3">
                <img
                  src={row.image}
                  alt={row.name}
                  className="w-14 h-14 rounded-2xl object-cover"
                />

                <div>
                  <h3 className={`font-semibold text-gray-800 ${styles.label}`}>{row.name}</h3>

                  <p className="text-xs text-gray-400 mt-1">{row.id}</p>
                </div>
              </div>
            );
          }

          // PRICE
          if (accessor === "price") {
            return (
              <span className={`font-semibold text-gray-800 ${styles.label}`}>{row.price}</span>
            );
          }

          // RATING
          if (accessor === "rating") {
            return (
              <div className="flex items-center gap-1 text-yellow-500 font-medium">
                <Star size={15} fill="currentColor" />

                {row.rating}
              </div>
            );
          }

          // STATUS
          if (accessor === "status") {
            return (
              <span
                className={`px-4 py-1.5 rounded-full text-xs font-semibold ${
                  row.status === "Available"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {row.status}
              </span>
            );
          }

          // ACTIONS
          if (accessor === "action") {
            return (
              <div className="flex items-center gap-2">
                <CommonButton
                  variant="orange"
                  icon={<Pencil size={15} />}
                  onClick={() => {
                    setEditMode(true);
                    setSelectedItem(row);

                    setValue("name", row.name);
                    setValue("price", row.price);
                    setValue("category", row.category);
                    setValue("image", row.image);

                    setIsModalOpen(true);
                  }}
                >
                  Edit
                </CommonButton>

                <CommonButton variant="red" icon={<Trash2 size={15} />}>
                  Delete
                </CommonButton>
              </div>
            );
          }

          return row[accessor];
        }}
      />

      {/* ================= PAGINATION ================= */}
      <CommonPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          reset();
        }}
        title={editMode ? "Edit Food Item" : "Add Food Item"}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* NAME */}
          <input
            type="text"
            placeholder="Food Name"
            {...register("name", { required: true })}
            className="w-full p-3 border rounded-xl"
          />

          {/* PRICE */}
          <input
            type="text"
            placeholder="Price"
            {...register("price", { required: true })}
            className="w-full p-3 border rounded-xl"
          />

          {/* CATEGORY */}
          <select
            {...register("category", { required: true })}
            className={`w-full p-3 border rounded-xl text-gray-400 ${styles.card}`}
          >
            <option value="">Select Category</option>
            <option value="Burger">Burger</option>
            <option value="Pizza">Pizza</option>
            <option value="Pasta">Pasta</option>
            <option value="Snacks">Snacks</option>
            <option value="Starter">Starter</option>
          </select>

          {/* IMAGE URL */}
          <input
            type="text"
            placeholder="Image URL"
            {...register("image")}
            className="w-full p-3 border rounded-xl"
          />

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-xl font-medium"
          >
            {editMode ? "Update Item" : "Add Item"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default MenuPage;
