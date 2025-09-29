import { useState } from "react";
import PropTypes from "prop-types";

import styles from "./BlogPagination.module.css";
import Card from "../ui/Card";

function Pagination({ currentPage, updateCurrentPage, maxPageCount }) {
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
        <button
          onClick={handlePreviousButtonClick}
          aria-label="Go to previous page"
        >
          Previous
        </button>
        <p className={styles.paginationText}>
          Page {currentPageCount} / {maxPageCount}
        </p>
        <button onClick={handleNextButtonClick} aria-label="Go to next page">
          Next
        </button>
      </div>
    </Card>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  updateCurrentPage: PropTypes.func.isRequired,
  maxPageCount: PropTypes.number.isRequired,
};

export default Pagination;
