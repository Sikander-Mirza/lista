// Components/Pagination/Pagination.jsx
import { memo, useMemo, useCallback } from 'react';

// Simple inline SVG icons - no external library
const ChevronLeft = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRight = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const Pagination = memo(({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  
  const pageNumbers = useMemo(() => {
    // Limit visible pages for better performance
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    // Show limited pages with ellipsis logic
    const pages = [];
    if (currentPage <= 3) {
      for (let i = 1; i <= 5; i++) pages.push(i);
      pages.push('...');
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1);
      pages.push('...');
      for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      pages.push('...');
      for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
      pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  }, [totalPages, currentPage]);

  const handlePrevious = useCallback(() => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  }, [currentPage, onPageChange]);

  const handleNext = useCallback(() => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  }, [currentPage, totalPages, onPageChange]);

  const handlePageClick = useCallback((pageNum) => {
    if (typeof pageNum === 'number') {
      onPageChange(pageNum);
    }
  }, [onPageChange]);

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center w-full">
      <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="relative inline-flex items-center rounded-l-md px-3 py-2 text-black ring-1 ring-gray-300 ring-inset hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous"
        >
          <ChevronLeft />
        </button>

        {pageNumbers.map((pageNum, idx) => {
          if (pageNum === '...') {
            return (
              <span
                key={`ellipsis-${idx}`}
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300"
              >
                ...
              </span>
            );
          }
          
          const isActive = pageNum === currentPage;
          return (
            <button
              key={pageNum}
              onClick={() => handlePageClick(pageNum)}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 ${
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
          className="relative inline-flex items-center rounded-r-md px-3 py-2 text-black ring-1 ring-gray-300 ring-inset hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next"
        >
          <ChevronRight />
        </button>
      </nav>
    </div>
  );
});

Pagination.displayName = 'Pagination';

export default Pagination;