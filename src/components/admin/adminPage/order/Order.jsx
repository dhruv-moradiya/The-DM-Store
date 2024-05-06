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
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('userName', {
      header: 'User Name',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('phone', {
      header: 'Phone No',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('email', {
      header: 'Email',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.cartItems, {
      id: 'items',
      header: 'Number of Items',
      cell: (info) => info.getValue().length,
    }),
    columnHelper.accessor('total', {
      header: 'Total',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('discount', {
      header: 'Discount',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('taxAmount', {
      header: 'Tax Amount',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('date', {
      header: 'Date',
      cell: (info) => info.getValue(),
    }),
  ];

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
      {/* <table className={styles.table}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User name</th>
            <th>Phone no</th>
            <th>Email</th>
            <th>Number of Items</th>
            <th>Total</th>
            <th>Discount</th>
            <th>Tax Ammount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Wea_02sTw800</td>
            <td>Dhruv</td>
            <td>+91 99002 25648</td>
            <td>dhruv@gmail.com</td>
            <td>10</td>
            <td>₹300</td>
            <td>10%</td>
            <td>₹3900.98</td>
            <td>October 25, 2021</td>
          </tr>
          <tr>
            <td>Wea_02sTw800</td>
            <td>Dhruv</td>
            <td>+91 99002 25648</td>
            <td>dhruv@gmail.com</td>
            <td>10</td>
            <td>₹300</td>
            <td>10%</td>
            <td>₹3900.98</td>
            <td>October 25, 2021</td>
          </tr>
        </tbody>
      </table> */}
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
