// Dashboard stats cards
import { ShoppingCart, DollarSign, Clock, CheckCircle } from "lucide-react";

export const statsData = [
  {
    title: "Total Orders",
    value: 1240,
    change: "+12%",
    icon: ShoppingCart,
  },
  {
    title: "Revenue",
    value: "₹45,200",
    change: "+8%",
    icon: DollarSign,
  },
  {
    title: "Pending Orders",
    value: 32,
    change: "-5%",
    icon: Clock,
  },
  {
    title: "Delivered",
    value: 980,
    change: "+10%",
    icon: CheckCircle,
  },
];

export const orderColumns = [
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
];

// Recent orders table
export const ordersData = [
  {
    id: "#ORD001",
    customer: "Rahul Sharma",
    items: "Burger, Coke",
    amount: "₹250",
    status: "Pending",
  },
  {
    id: "#ORD002",
    customer: "Anjali Verma",
    items: "Pizza",
    amount: "₹500",
    status: "Preparing",
  },
  {
    id: "#ORD003",
    customer: "Amit Singh",
    items: "Pasta",
    amount: "₹350",
    status: "Delivered",
  },
   {
    id: "#ORD004",
    customer: "Amit Singh",
    items: "Pasta",
    amount: "₹350",
    status: "Delivered",
  },
     {
    id: "#ORD005",
    customer: "Amit Singh",
    items: "Pasta",
    amount: "₹350",
    status: "Delivered",
  },
  
];

export const weeklyFoodSales = [
  {
    day: "Mon",
    Pizza: 20,
    Burger: 15,
    Pasta: 10,
  },
  {
    day: "Tue",
    Pizza: 25,
    Burger: 18,
    Pasta: 12,
  },
  {
    day: "Wed",
    Pizza: 30,
    Burger: 22,
    Pasta: 15,
  },
  {
    day: "Thu",
    Pizza: 28,
    Burger: 20,
    Pasta: 18,
  },
  {
    day: "Fri",
    Pizza: 40,
    Burger: 30,
    Pasta: 22,
  },
  {
    day: "Sat",
    Pizza: 50,
    Burger: 38,
    Pasta: 28,
  },
  {
    day: "Sun",
    Pizza: 45,
    Burger: 35,
    Pasta: 25,
  },
];