// import { Outlet } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import Header from "../components/Header";

// const MainLayout = () => {
//   return (
//     <div className="flex min-h-screen">
      
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content */}
//       <div className="flex-1 bg-gray-100">
//         <Header/>
//         <Outlet />
//       </div>

//     </div>
//   );
// };

// export default MainLayout;


import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen w-full overflow-x-hidden">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 min-w-0 overflow-x-hidden bg-gray-100">
        <Header />
        <Outlet />
      </div>

    </div>
  );
};

export default MainLayout;