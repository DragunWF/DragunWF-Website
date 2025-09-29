import { useState } from "react";
import PropTypes from "prop-types";

import styles from "./BlogPagination.module.css";
import Card from "../ui/Card";
import BlogButton from "./BlogButton";

function Pagination({
  currentPage,
  updateCurrentPage,
  maxPageCount,
  hasNext,
  hasPrevious,
}) {
  const [currentPageCount, setCurrentPageCount] = useState(currentPage);

  function handlePreviousButtonClick() {
    updatePageCount(currentPageCount - 1);
  }

  function handleNextButtonClick() {
    updatePageCount(currentPageCount + 1);
  }

  function updatePageCount(updatedCount) {
    if (updatedCount > maxPageCount) {
      updatedCount = 1;
    } else if (updatedCount <= 0) {
      updatedCount = maxPageCount;
    }
    setCurrentPageCount(updatedCount);
    updateCurrentPage(updatedCount);
  }

  return (
    <Card>
      <div className={styles.wrapper}>
        <BlogButton
          onClick={handlePreviousButtonClick}
          variant="blogOutline"
          size="medium"
          disabled={!hasPrevious}
          aria-label="Go to previous page"
        >
          Previous
        </BlogButton>

        <div className={styles.paginationInfo}>
          <span className={styles.paginationText}>
            Page {currentPageCount} of {maxPageCount}
          </span>
        </div>

        <BlogButton
          onClick={handleNextButtonClick}
          variant="blogOutline"
          size="medium"
          disabled={!hasNext}
          aria-label="Go to next page"
        >
          Next
        </BlogButton>
      </div>
    </Card>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  updateCurrentPage: PropTypes.func.isRequired,
  maxPageCount: PropTypes.number.isRequired,
  hasNext: PropTypes.bool,
  hasPrevious: PropTypes.bool,
};

Pagination.defaultProps = {
  hasNext: false,
  hasPrevious: false,
};

export default Pagination;
