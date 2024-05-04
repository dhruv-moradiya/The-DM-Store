import React from 'react'
import styles from '../../productList.module.css';
import { flexRender } from '@tanstack/react-table';
import { filterItem } from '../../helper/helperFuctions';

function Table({ table, sortingHeading }) {
  return (
    <table className={styles.tableProductList}>
      <thead className={styles.productListThead}>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className={
                  [
                    "Product Name",
                    "Price",
                    "Discount",
                    "Product Adding date",
                  ].includes(header.column.columnDef.header)
                    ? styles.sortingHeading
                    : ""
                }
              >
                {header.isPlaceholder ? null : (
                  <div
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {filterItem(header)}
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: <span>⬆️</span>,
                      desc: <span>⬇️</span>,
                    }[header.column.getIsSorted()] ?? null}
                  </div>
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className={styles.productListTbody}>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext()
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table