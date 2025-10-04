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
          size="small"
          disabled={!hasPrevious}
          aria-label="Go to previous page"
          className={styles.navigationButton}
        >
          <span className={styles.buttonText}>
            <span className={styles.fullText}>Previous</span>
            <span className={styles.shortText}>‹</span>
          </span>
        </BlogButton>

        <div className={styles.paginationInfo}>
          <span className={styles.paginationText}>
            <span className={styles.fullPageText}>
              Page {currentPageCount} of {maxPageCount}
            </span>
            <span className={styles.shortPageText}>
              {currentPageCount}/{maxPageCount}
            </span>
          </span>
        </div>

        <BlogButton
          onClick={handleNextButtonClick}
          variant="blogOutline"
          size="small"
          disabled={!hasNext}
          aria-label="Go to next page"
          className={styles.navigationButton}
        >
          <span className={styles.buttonText}>
            <span className={styles.fullText}>Next</span>
            <span className={styles.shortText}>›</span>
          </span>
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
