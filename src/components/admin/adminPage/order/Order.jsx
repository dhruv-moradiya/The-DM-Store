import React from "react";
import styles from "./order.module.css";
import {
  createColumnHelper,
  getCoreRowModel,
  flexRender,
  useReactTable,
} from "@tanstack/react-table";

function Order({ orderData }) {
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor('id', {
      header: 'Order ID',
      cell: (info) => <p className={styles.headerPera}>{info.getValue()}</p>,
    }),
    columnHelper.accessor('userName', {
      header: 'User Name',
      cell: (info) => <p className={styles.headerPera}>{info.getValue()}</p>,
    }),
    columnHelper.accessor('phone', {
      header: 'Phone No',
      cell: (info) => <p className={styles.headerPera}>{info.getValue()}</p>,
    }),
    columnHelper.accessor('email', {
      header: 'Email',
      cell: (info) => <p className={styles.headerPera}>{info.getValue()}</p>,
    }),
    columnHelper.accessor((row) => row.cartItems, {
      id: 'items',
      header: 'Number of Items',
      cell: (info) => info.getValue().length,
    }),
    columnHelper.accessor('total', {
      header: 'Total',
      cell: (info) => `₹${Math.round(info.getValue()).toLocaleString("en-IN")}`,
    }),
    columnHelper.accessor('discount', {
      header: 'Discount',
      cell: (info) => `₹${Math.round(info.getValue()).toLocaleString("en-IN")}`,
    }),
    columnHelper.accessor('taxAmount', {
      header: 'Tax Amount',
      cell: (info) => `₹${Math.round(info.getValue()).toLocaleString("en-IN")}`,
    }),
    columnHelper.accessor('date', {
      header: 'Date',
      cell: (info) => <p className={styles.headerPera}>{info.getValue()}</p>,
    }),
  ];

  console.log(orderData)

  const table = useReactTable({
    data: orderData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });


  return (
    <div className={styles.container}>
      <h3>
        <i className="ri-price-tag-2-fill" />
        Order
      </h3>
      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
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
    </div>
  );
}

export default Order;
