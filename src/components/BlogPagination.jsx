import { useState } from "react";
import styles from "./BlogPagination.module.css";
import Card from "./Card";

function Pagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPageCount = 5;

  function handlePreviousButtonClick() {
    updatePageCount(currentPage - 1);
  }

  function handleNextButtonClick() {
    updatePageCount(currentPage + 1);
  }

  function updatePageCount(updatedCount) {
    if (updatedCount > maxPageCount) {
      updatedCount = 1;
    } else if (updatedCount <= 0) {
      updatedCount = maxPageCount;
    }
    setCurrentPage(updatedCount);
  }

  return (
    <Card>
      <div className={styles.wrapper}>
        <button onClick={handlePreviousButtonClick}>Previous</button>
        <p className={styles.paginationText}>
          Page {currentPage} out of {maxPageCount}
        </p>
        <button onClick={handleNextButtonClick}>Next</button>
      </div>
    </Card>
  );
}

export default Pagination;
