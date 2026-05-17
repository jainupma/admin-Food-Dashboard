import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { getThemeStyles } from "../../styles/themeStyles";

const CommonTable = ({
  title,
  columns,
  data,
  renderCell,
  viewAllLink,

  // OPTIONAL
  tableWrapperClass = "",
  tableClass = "",
  containerClass = "",

  // OPTIONAL
  minWidth = "min-w-[1200px]",
}) => {
  const navigate = useNavigate();

  const { theme } = useTheme();
 
  const darkMode = theme === "dark";
  const styles = getThemeStyles(darkMode);

  return (
    <div
      className={`
        w-full
        rounded-2xl
        shadow-sm
        border
        p-3 sm:p-5 lg:p-7
        font-body
        overflow-hidden
        transition-all duration-300

        ${
          styles.card
        }

        ${containerClass}
      `}
    >
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <h2
          className={`
            text-base sm:text-lg
            font-heading
            break-words
            ${
              styles.heading
            }
          `}
        >
          {title}
        </h2>

        {viewAllLink && (
          <button
            onClick={() => navigate(viewAllLink)}
            className={`
              text-sm
              self-start sm:self-auto
              transition-colors

              ${
                darkMode
                  ? "text-orange-400 hover:text-orange-300"
                  : "text-orange-500 hover:text-orange-600"
              }
            `}
          >
            View All
          </button>
        )}
      </div>

      {/* TABLE WRAPPER */}
      <div
        className={`
          w-full
          max-w-full
          overflow-hidden
          rounded-2xl
          border
          transition-all duration-300

          ${styles.tableWrapper}
          ${tableWrapperClass}
        `}
      >
        {/* HORIZONTAL SCROLL */}
        <div className="w-full overflow-x-auto">
          <table
            className={`
              ${minWidth}
              w-full
              text-sm
              border-separate
              border-spacing-0
              ${styles.table}
            `}
          >
            {/* TABLE HEAD */}
            <thead
              className={
                `${styles.tableHeader}`
              }
            >
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    style={{
                      minWidth:
                        column.minWidth || "140px",
                    }}
                    className={`
                      px-4
                      py-3
                      text-left
                      text-xs
                      font-semibold
                      uppercase
                      tracking-wide
                      whitespace-nowrap
                      border-b

                      ${
                        styles.tableHeader
                      }
                    `}
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody
              className={
                darkMode
                  ? "divide-y divide-[#334155] bg-[#0F172A]"
                  : "divide-y divide-gray-100 bg-white"
              }
            >
              {data?.length > 0 ? (
                data.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={`
                      transition-colors duration-200

                      ${
                        styles.tableRow
                      }
                    `}
                  >
                    {columns.map((column, colIndex) => (
                      <td
                        key={colIndex}
                        style={{
                          minWidth:
                            column.minWidth ||
                            "140px",
                        }}
                        className={`
                          px-4
                          py-4
                          whitespace-nowrap
                              "text-gray-700"
                        `}
                      >
                        {renderCell
                          ? renderCell(
                              column.accessor,
                              row
                            )
                          : row[column.accessor]}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className={`
                      py-10
                      text-center

                      
                          "text-gray-400"
                      
                    `}
                  >
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CommonTable;
















// import React from "react";
// import { useNavigate } from "react-router-dom";

// const CommonTable = ({
//   title,
//   columns,
//   data,
//   renderCell,
//   viewAllLink,

//   // OPTIONAL
//   tableWrapperClass = "",
//   tableClass = "",
//   containerClass = "",

//   // NEW
//   minWidth = "min-w-screen",
// }) => {
//   const navigate = useNavigate();

//   return (
//     <div
//       className={`
//         w-full
//         bg-white
//         rounded-2xl
//         shadow-sm
//         border
//         border-gray-100
//         p-3 sm:p-5 lg:p-7
//         font-body
//         overflow-hidden
//         ${containerClass}
//       `}
//     >
//       {/* HEADER */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">

//         <h2 className="text-base sm:text-lg font-heading text-gray-800 break-words">
//           {title}
//         </h2>

//         {viewAllLink && (
//           <button
//             onClick={() => navigate(viewAllLink)}
//             className="text-sm text-orange-500 hover:underline self-start sm:self-auto"
//           >
//             View All
//           </button>
//         )}
//       </div>

//       {/* ONLY TABLE SCROLLS */}
// <div className="w-full max-w-full overflow-hidden rounded-2xl border border-gray-200 bg-white">

//   <div className="w-full overflow-x-auto">

//     <table
//       className={`
//         min-w-[1200px]
//         w-full
//         text-sm
//         border-separate
//         border-spacing-0
//         ${tableClass}
//       `}
//     >
//       {/* HEAD */}
//       <thead className="bg-gray-50">
//         <tr>
//           {columns.map((column, index) => (
//             <th
//               key={index}
//               style={{
//                 minWidth: column.minWidth || "140px",
//               }}
//               className="
//                 px-4
//                 py-3
//                 text-left
//                 text-xs
//                 font-semibold
//                 uppercase
//                 tracking-wide
//                 text-gray-500
//                 whitespace-nowrap
//                 border-b
//                 border-gray-200
//               "
//             >
//               {column.header}
//             </th>
//           ))}
//         </tr>
//       </thead>

//       {/* BODY */}
//       <tbody className="divide-y divide-gray-100 bg-white">
//         {data?.length > 0 ? (
//           data.map((row, rowIndex) => (
//             <tr key={rowIndex}>
//               {columns.map((column, colIndex) => (
//                 <td
//                   key={colIndex}
//                   style={{
//                     minWidth:
//                       column.minWidth || "140px",
//                   }}
//                   className="
//                     px-4
//                     py-4
//                     whitespace-nowrap
//                     text-gray-700
//                   "
//                 >
//                   {renderCell
//                     ? renderCell(column.accessor, row)
//                     : row[column.accessor]}
//                 </td>
//               ))}
//             </tr>
//           ))
//         ) : (
//           <tr>
//             <td
//               colSpan={columns.length}
//               className="py-10 text-center text-gray-400"
//             >
//               No data found
//             </td>
//           </tr>
//         )}
//       </tbody>
//     </table>

//   </div>
// </div>
//     </div>
//   );
// };

// export default CommonTable;