import { memo, useMemo, useCallback } from 'react';

const ChevronLeft = memo(() => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
));
ChevronLeft.displayName = 'ChevronLeft';

const ChevronRight = memo(() => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
));
ChevronRight.displayName = 'ChevronRight';

const PageButton = memo(({ pageNum, isActive, onClick }) => (
  <button
    onClick={onClick}
    aria-current={isActive ? 'page' : undefined}
    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 min-w-[40px] min-h-[40px] ${
      isActive
        ? "z-10 bg-indigo-600 text-white"
        : "text-gray-900 hover:bg-gray-50"
    }`}
    style={{ contain: 'layout style' }}
  >
    {pageNum}
  </button>
));
PageButton.displayName = 'PageButton';

const Pagination = memo(({ currentPage, totalPages, onPageChange }) => {
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

  // ✅ Batch page changes with requestAnimationFrame to prevent forced reflows
  const handlePrevious = useCallback(() => {
    if (currentPage > 1) {
      requestAnimationFrame(() => onPageChange(currentPage - 1));
    }
  }, [currentPage, onPageChange]);

  const handleNext = useCallback(() => {
    if (currentPage < totalPages) {
      requestAnimationFrame(() => onPageChange(currentPage + 1));
    }
  }, [currentPage, totalPages, onPageChange]);

  const pageClickHandlers = useMemo(() => {
    const handlers = {};
    pageNumbers.forEach((pageNum) => {
      if (typeof pageNum === 'number') {
        handlers[pageNum] = () => {
          requestAnimationFrame(() => onPageChange(pageNum));
        };
      }
    });
    return handlers;
  }, [pageNumbers, onPageChange]);

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center w-full">
      <nav
        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
        aria-label="Pagination"
        style={{ contain: 'layout style' }}
      >
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="relative inline-flex items-center rounded-l-md px-3 py-2 text-black ring-1 ring-gray-300 ring-inset hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed min-w-[40px] min-h-[40px]"
          aria-label="Previous page"
          style={{ contain: 'layout style' }}
        >
          <ChevronLeft />
        </button>

        {pageNumbers.map((pageNum, idx) => {
          if (pageNum === '...') {
            return (
              <span
                key={`ellipsis-${idx}`}
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 min-w-[40px] min-h-[40px]"
                aria-hidden="true"
                style={{ contain: 'layout style' }}
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

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="relative inline-flex items-center rounded-r-md px-3 py-2 text-black ring-1 ring-gray-300 ring-inset hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed min-w-[40px] min-h-[40px]"
          aria-label="Next page"
          style={{ contain: 'layout style' }}
        >
          <ChevronRight />
        </button>
      </nav>
    </div>
  );
});

Pagination.displayName = 'Pagination';

export default Pagination;