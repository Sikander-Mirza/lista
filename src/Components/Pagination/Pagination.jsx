import { memo, useMemo, useCallback } from 'react';

// Pre-render SVG strings as constants outside component to avoid re-creation
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

// Static styles as constants - prevents style recalculation on each render
const STYLES = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  nav: {
    isolation: 'isolate',
    display: 'inline-flex',
    borderRadius: '0.375rem',
    boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  },
  buttonBase: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
    fontWeight: 600,
    boxShadow: 'inset 0 0 0 1px #d1d5db',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: 'transparent',
    color: '#111827',
    // Prevent layout shift by using fixed dimensions
    minWidth: '40px',
    minHeight: '40px',
    // Use contain to isolate layout/paint
    contain: 'layout style',
  },
  buttonActive: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
    fontWeight: 600,
    boxShadow: 'inset 0 0 0 1px #d1d5db',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: '#4f46e5',
    color: '#ffffff',
    zIndex: 10,
    minWidth: '40px',
    minHeight: '40px',
    contain: 'layout style',
  },
  navButton: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.5rem 0.75rem',
    color: '#000000',
    boxShadow: 'inset 0 0 0 1px #d1d5db',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    minWidth: '40px',
    minHeight: '40px',
    contain: 'layout style',
  },
  navButtonLeft: {
    borderTopLeftRadius: '0.375rem',
    borderBottomLeftRadius: '0.375rem',
  },
  navButtonRight: {
    borderTopRightRadius: '0.375rem',
    borderBottomRightRadius: '0.375rem',
  },
  ellipsis: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#374151',
    boxShadow: 'inset 0 0 0 1px #d1d5db',
    minWidth: '40px',
    minHeight: '40px',
    contain: 'layout style',
  },
  disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
};

// Pre-compute merged styles
const prevButtonStyle = { ...STYLES.navButton, ...STYLES.navButtonLeft };
const nextButtonStyle = { ...STYLES.navButton, ...STYLES.navButtonRight };
const prevButtonDisabledStyle = { ...prevButtonStyle, ...STYLES.disabled };
const nextButtonDisabledStyle = { ...nextButtonStyle, ...STYLES.disabled };

// Separate PageButton component to minimize re-renders
const PageButton = memo(({ pageNum, isActive, onClick }) => (
  <button
    onClick={onClick}
    style={isActive ? STYLES.buttonActive : STYLES.buttonBase}
    aria-current={isActive ? 'page' : undefined}
  >
    {pageNum}
  </button>
));
PageButton.displayName = 'PageButton';

const Pagination = memo(({
  currentPage,
  totalPages,
  onPageChange,
}) => {
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

  const handlePrevious = useCallback(() => {
    if (currentPage > 1) {
      // Use requestAnimationFrame to batch DOM updates and avoid forced reflow
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

  // Create stable click handlers for each page number
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

  if (totalPages <= 1) return null;

  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  return (
    <div style={STYLES.wrapper}>
      <nav style={STYLES.nav} aria-label="Pagination">
        <button
          onClick={handlePrevious}
          disabled={isPrevDisabled}
          style={isPrevDisabled ? prevButtonDisabledStyle : prevButtonStyle}
          aria-label="Previous page"
        >
          <ChevronLeft />
        </button>

        {pageNumbers.map((pageNum, idx) => {
          if (pageNum === '...') {
            return (
              <span key={`ellipsis-${idx}`} style={STYLES.ellipsis} aria-hidden="true">
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
          disabled={isNextDisabled}
          style={isNextDisabled ? nextButtonDisabledStyle : nextButtonStyle}
          aria-label="Next page"
        >
          <ChevronRight />
        </button>
      </nav>
    </div>
  );
});

Pagination.displayName = 'Pagination';

export default Pagination;