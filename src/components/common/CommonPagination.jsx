import { ChevronLeft, ChevronRight } from "lucide-react";

const CommonPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex items-center justify-between mt-6">

      {/* Left */}
      <p className="text-sm text-gray-400">
        Page {currentPage} of {totalPages}
      </p>

      {/* Right */}
      <div className="flex items-center gap-2">

        {/* Prev */}
        <button
          disabled={currentPage === 1}
          onClick={() =>
            onPageChange(currentPage - 1)
          }
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
            currentPage === 1
              ? "bg-gray-100 text-gray-800 cursor-not-allowed"
              : "bg-white border border-gray-200 hover:bg-orange-50 hover:border-orange-200"
          }`}
        >
          <ChevronLeft size={18} />
        </button>

        {/* Pages */}
        {Array.from(
          { length: totalPages },
          (_, index) => (
            <button
              key={index}
              onClick={() =>
                onPageChange(index + 1)
              }
              className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${
                currentPage === index + 1
                  ? "bg-orange-500 text-white"
                  : "bg-white border border-gray-200 hover:bg-orange-50"
              }`}
            >
              {index + 1}
            </button>
          )
        )}

        {/* Next */}
        <button
          disabled={currentPage === totalPages}
          onClick={() =>
            onPageChange(currentPage + 1)
          }
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-800 cursor-not-allowed"
              : "bg-white border border-gray-200 hover:bg-orange-50 hover:border-orange-200"
          }`}
        >
          <ChevronRight size={18} />
        </button>

      </div>
    </div>
  );
};

export default CommonPagination;