// Components/Pagination/Pagination.jsx
import { memo, useMemo, useCallback } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const Pagination = memo(({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  
  // ✅ FIX: Memoize page numbers array
  const pageNumbers = useMemo(() => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }, [totalPages]);

  // ✅ FIX: Memoize handlers
  const handlePrevious = useCallback(() => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  }, [currentPage, onPageChange]);

  const handleNext = useCallback(() => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  }, [currentPage, totalPages, onPageChange]);

  const handlePageClick = useCallback((pageNum) => {
    onPageChange(pageNum);
  }, [onPageChange]);

  return (
    <div className="flex items-center justify-center w-full">
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-l-md px-4 py-2 text-black ring-1 ring-gray-300 ring-inset hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only cursor-pointer font-Inter">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>

            {pageNumbers.map((pageNum) => {
              const isActive = pageNum === currentPage;
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageClick(pageNum)}
                  className={`relative inline-flex items-center px-4.5 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 cursor-pointer font-Urbanist ${
                    isActive
                      ? "z-10 bg-indigo-600 text-white"
                      : "text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center rounded-r-md px-4 py-2 text-black ring-1 ring-gray-300 ring-inset hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
    </div>
  );
});

Pagination.displayName = 'Pagination';

export default Pagination;