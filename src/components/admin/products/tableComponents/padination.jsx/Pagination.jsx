import React from 'react'
import styles from './pagination.module.css'

function Pagination({ productList, table }) {
  return (
    <div className={styles.paginationPart}>
      <div className={styles.itemPerPage}>
        <p>Total: {productList.length}</p>
        <p>Items per page</p>
        <select
          className={styles.op}
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
        >
          {[8, 12, 16, 20].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.pageNavigation}>
        <button
          className={styles.arrowButton}
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <i className="ri-arrow-left-double-line"></i>
        </button>
        <button
          className={styles.arrowButton}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <i className="ri-arrow-left-s-line"></i>
        </button>
        <input
          type="number"
          min={1}
          max={table.getPageCount()}
          value={table.getState().pagination.pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value
              ? Number(e.target.value) - 1
              : 0;
            table.setPageIndex(page);
          }}
        />
        <p>Page 1</p>
        <button
          className={styles.arrowButton}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <i className="ri-arrow-right-s-line"></i>
        </button>
        <button
          className={styles.arrowButton}
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <i className="ri-arrow-right-double-fill"></i>
        </button>
      </div>
    </div>
  )
}

export default Pagination