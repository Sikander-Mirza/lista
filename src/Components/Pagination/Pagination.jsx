import { memo, useMemo, useCallback } from 'react';

// ✅ Memoized SVG icons with fixed dimensions
const ChevronLeft = memo(() => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth={2}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
));
ChevronLeft.displayName = 'ChevronLeft';

const ChevronRight = memo(() => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth={2}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
));
ChevronRight.displayName = 'ChevronRight';

// ✅ Memoized page button to prevent re-renders
const PageButton = memo(({ pageNum, isActive, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-current={isActive ? 'page' : undefined}
    className={`relative inline-flex items-center justify-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 ${
      isActive
        ? "z-10 bg-indigo-600 text-white"
        : "text-gray-900 hover:bg-gray-50"
    }`}
    style={{ 
      minWidth: '40px', 
      minHeight: '40px',
      contain: 'layout style paint',
    }}
  >
    {pageNum}
  </button>
));
PageButton.displayName = 'PageButton';

const Pagination = memo(({ currentPage, totalPages, onPageChange }) => {
  // ✅ Memoize page numbers calculation
  const pageNumbers = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

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

  // ✅ Use requestAnimationFrame to batch DOM updates
  const handlePrevious = useCallback(() => {
    if (currentPage > 1) {
      requestAnimationFrame(() => {
        onPageChange(currentPage - 1);
      });
    }
  }, [currentPage, onPageChange]);

  const handleNext = useCallback(() => {
    if (currentPage < totalPages) {
      requestAnimationFrame(() => {
        onPageChange(currentPage + 1);
      });
    }
  }, [currentPage, totalPages, onPageChange]);

  // ✅ Memoize click handlers for each page
  const pageClickHandlers = useMemo(() => {
    const handlers = {};
    pageNumbers.forEach((pageNum) => {
      if (typeof pageNum === 'number') {
        handlers[pageNum] = () => {
          requestAnimationFrame(() => {
            onPageChange(pageNum);
          });
        };
      }
    });
    return handlers;
  }, [pageNumbers, onPageChange]);

  // Don't render if only one page
  if (totalPages <= 1) return null;

  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  return (
    <div 
      className="flex items-center justify-center w-full"
      style={{ contain: 'layout style' }}
    >
      <nav
        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
        aria-label="Pagination"
        style={{ contain: 'layout style' }}
      >
        {/* Previous Button */}
        <button
          type="button"
          onClick={handlePrevious}
          disabled={isPrevDisabled}
          aria-label="Previous page"
          className={`relative inline-flex items-center justify-center rounded-l-md px-3 py-2 text-black ring-1 ring-gray-300 ring-inset hover:bg-gray-50 ${
            isPrevDisabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          style={{ 
            minWidth: '40px', 
            minHeight: '40px',
            contain: 'layout style paint',
          }}
        >
          <ChevronLeft />
        </button>

        {/* Page Numbers */}
        {pageNumbers.map((pageNum, idx) => {
          if (pageNum === '...') {
            return (
              <span
                key={`ellipsis-${idx}`}
                className="relative inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300"
                aria-hidden="true"
                style={{ 
                  minWidth: '40px', 
                  minHeight: '40px',
                  contain: 'layout style paint',
                }}
              >
                …
              </span>
            );
          }

          return (
            <PageButton
              key={pageNum}
              pageNum={pageNum}
              isActive={pageNum === currentPage}
              onClick={pageClickHandlers[pageNum]}
            />
          );
        })}

        {/* Next Button */}
        <button
          type="button"
          onClick={handleNext}
          disabled={isNextDisabled}
          aria-label="Next page"
          className={`relative inline-flex items-center justify-center rounded-r-md px-3 py-2 text-black ring-1 ring-gray-300 ring-inset hover:bg-gray-50 ${
            isNextDisabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          style={{ 
            minWidth: '40px', 
            minHeight: '40px',
            contain: 'layout style paint',
          }}
        >
          <ChevronRight />
        </button>
      </nav>
    </div>
  );
});

Pagination.displayName = 'Pagination';

export default Pagination;