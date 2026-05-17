// utils/themeStyles.js

export const getThemeStyles = (darkMode) => {
  return {
    // ================= PAGE =================
    page: darkMode
      ? "bg-[#0F172A] text-white"
      : "bg-[#f8fafc] text-gray-800",


    //===========Sidebar=========================
    sidebar: darkMode
     ? "bg-[#111C33] text-slate-100"
     :"bg-gray-100 text-gray-800",

    // ================= CARD =================
    card: darkMode
      ? "bg-transparent border border-slate-700"
      : "bg-white border border-gray-200",

    // ================= HEADING =================
    heading: darkMode
      ? "text-white"
      : "text-gray-800",

    // ================= SUB TEXT =================
    subText: darkMode
      ? "text-slate-400"
      : "text-gray-400",

    // ================= LABEL =================
    label: darkMode
      ? "text-slate-300"
      : "text-gray-600",

    labelAxis: darkMode
  ? "#CBD5E1"
  : "#4B5563",

    // ================= INPUT =================
    input: darkMode
      ? `
        bg-[#0f172a]
        border-slate-700
        text-white
        placeholder:text-slate-500
      `
      : `
        bg-white
        border-gray-200
        text-gray-800
        placeholder:text-gray-400
      `,

    // ================= SELECT =================
    select: darkMode
      ? `
        bg-[#0f172a]
        border-slate-700
        text-white
      `
      : `
        bg-white
        border-gray-200
        text-gray-700
      `,

    // ================= DISABLED INPUT =================
    disabledInput: darkMode
      ? "bg-slate-800 border-slate-700 text-slate-400"
      : "bg-gray-50 border-gray-200 text-gray-500",

    // ================= UPLOAD BOX =================
    uploadBox: darkMode
      ? "border-slate-700 bg-slate-900"
      : "border-gray-300 bg-gray-50",

    // ================= TOGGLE ICON BG =================
    toggleIconBg: darkMode
      ? "bg-slate-800"
      : "bg-gray-100",

    // ================= TABLE WRAPPER =================
    tableWrapper: darkMode
      ? "bg-[#1e293b] border border-slate-700"
      : "bg-white border border-gray-200",

    // ================= TABLE =================
    table: darkMode
      ? "bg-[#1e293b] text-white"
      : "bg-white text-gray-800",

    // ================= TABLE HEADER =================
    tableHeader: darkMode
      ? "bg-slate-800 text-slate-300"
      : "bg-gray-50 text-gray-500",

    // ================= TABLE ROW =================
    tableRow: darkMode
      ? "border-slate-700 hover:bg-slate-800"
      : "border-gray-100 hover:bg-gray-50",


    //========TABLE DATA============
    

    // ================= MODAL =================
    modal: darkMode
      ? "bg-[#1e293b] border border-slate-700 text-white"
      : "bg-white border border-gray-200 text-gray-800",

    // ================= STATS CARD =================
    statsCard: darkMode
      ? "bg-[#1e293b] border border-slate-700"
      : "bg-white border border-gray-200",

    // ================= SEARCH =================
    search: darkMode
      ? `
        bg-[#0f172a]
        border-slate-700
        text-white
        placeholder:text-slate-500
      `
      : `
        bg-white
        border-gray-200
        text-gray-700
        placeholder:text-gray-400
      `,

    // ================= BORDER =================
    border: darkMode
      ? "border-slate-700"
      : "border-gray-200",

    // ================= STATUS COLORS =================
    activeStatus: darkMode
      ? "bg-green-500/20 text-green-400"
      : "bg-green-100 text-green-600",

    busyStatus: darkMode
      ? "bg-yellow-500/20 text-yellow-300"
      : "bg-yellow-100 text-yellow-600",

    offlineStatus: darkMode
      ? "bg-gray-500/20 text-gray-300"
      : "bg-gray-100 text-gray-600",

    suspendedStatus: darkMode
      ? "bg-red-500/20 text-red-400"
      : "bg-red-100 text-red-600",

    // ================= ICON BACKGROUNDS =================
    iconBg: darkMode
      ? "bg-slate-800"
      : "bg-gray-100",

    // ================= HOVER =================
    hover: darkMode
      ? "hover:bg-slate-800"
      : "hover:bg-gray-50",

    // ================= SECONDARY CARD =================
    secondaryCard: darkMode
      ? "bg-slate-900 border border-slate-700"
      : "bg-gray-50 border border-gray-100",

    // ================= DIVIDER =================
    divider: darkMode
      ? "border-slate-700"
      : "border-gray-100",

    // ================= PAGINATION =================
    pagination: darkMode
      ? "bg-[#1e293b] border-slate-700 text-white"
      : "bg-white border-gray-200 text-gray-700",
  };
};