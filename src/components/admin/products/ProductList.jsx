import React, { useEffect, useReducer, useState } from "react";
import styles from "./productList.module.css";
import ProductAddForm from "./form/ProductAddForm";
import PopUp from "../../common/popUp/PopUp";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../context/Firebase";
import Loader from "../../common/loader/Loader";
import { capitalize, getDate } from "./form/helper";
import DeleteProduct from "./deleteProduct/DeleteProduct";
import UpdateForm from "./updateProductDetails/UpdateForm";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";



function ProductList() {
  const [productList, setProductList] = useState(null);
  const [openFrom, setOpenFrom] = useState(false);
  const [openUpdateFrom, setOpenUpdateFrom] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoding] = useState(false);
  const [showDeletePopUp, setShowDeletePopUp] = useState(false);
  const [idProduct, setIdProduct] = useState(null);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([])


  function hidePopOver() {
    setIsVisible(false);
    setError("");
  }

  function showDeletePopUpBox(id) {
    setShowDeletePopUp(true);
    window.scroll(0, 0);
    setIdProduct(id);
  }

  async function deleteProduct() {
    try {
      await deleteDoc(doc(db, "products", idProduct));
      setIsVisible(true);
      setMessage("Product deleted successfully");
      setShowDeletePopUp(false);
      productListData();
      setIdProduct(null);
    } catch (error) {
      console.log(error);
    }
  }

  async function productListData() {
    let productTemp = [];
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      querySnapshot.forEach((doc) => {
        productTemp.push(doc.data());
      });
    } catch (error) {
      console.log(error);
    }

    setProductList(productTemp);
  }

  function filterItem(header) {
    switch (header) {
      case 'For Whom':
        return <div>
          <select name="" id="">
            <option value="Male">Male</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

      default:
        break;
    }
  }

  function myCustomFilterFn(row, columnId, filterValue) {
    return row.getValue(columnId) === filterValue;
  }

  useEffect(() => {
    productListData();
  }, []);

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("imageURL1", {
      header: "Product Image",
      enableSorting: false,
      cell: (info) => (
        <div className={styles.imageTD}>
          <img src={info.getValue()} alt={info.row.name} />
        </div>
      ),
    }),
    columnHelper.accessor("name", {
      header: "Product Name",
      enableSorting: true,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("forWhome", {
      header: "For Whom",
      enableSorting: false,
      cell: (info) => <p>{capitalize(info.getValue())}</p>,
      filterFn: 'myCustomFilterFn'
    }),
    columnHelper.accessor("category", {
      header: "Category",
      enableSorting: false,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("productCollection", {
      header: "Collection",
      enableSorting: false,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("theme", {
      header: "Theme",
      enableSorting: false,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("price", {
      header: "Price",
      enableSorting: true,
      cell: (info) => `₹${info.getValue()}`,
    }),
    columnHelper.accessor("discount", {
      header: "Discount",
      enableSorting: true,
      cell: (info) => `${info.getValue()}%`,
    }),
    columnHelper.display({
      id: "icon_update",
      header: "Update",
      // enableSorting: false,
      cell: (info) => (
        <i
          className="ri-brush-2-fill"
          onClick={() => {
            setOpenUpdateFrom(true);
            setIdProduct(info.row.original.id);
            window.scroll(0, 0);
          }}
        ></i>
      ),
    }),
    columnHelper.display({
      id: "icon_delete",
      header: "Delete",
      // enableSorting: false,
      cell: (info) => (
        <i
          className="ri-delete-bin-6-fill"
          onClick={() => showDeletePopUpBox(info.row.original.id)}
        ></i>
      ),
    }),
    columnHelper.accessor((row) => row.date.seconds, {
      header: "Product Adding date",
      enableSorting: true,
      cell: (info) => {
        return getDate(info.getValue());
      },
    }),
    // columnHelper.accessor((row) => row.chekedCheckBox, {
    //   header: "Sizes",
    //   enableSorting: false,
    //   cell: (info) => {
    //     return (
    //       <div>
    //         {info.getValue().map((item) => (
    //           <span
    //             style={{
    //               border: "1px solid black",
    //               margin: "0 3px",
    //               padding: "2px 3px",
    //             }}
    //             key={item}
    //           >
    //             {item}
    //           </span>
    //         ))}
    //       </div>
    //     );
    //   },
    // }),
  ];

  const table = useReactTable({
    data: productList,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 8,
      },
    },
    manualFiltering: true,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // getFilteredRowModel: getFilteredRowModel(),
    filterFns: {
      myCustomFilterFn,
    }
  });
  console.log("columnFilters", columnFilters)
  return (
    <>
      {showDeletePopUp && (
        <DeleteProduct
          setShowDeletePopUp={setShowDeletePopUp}
          deleteProductFun={deleteProduct}
        />
      )}
      <div className={styles.container}>
        {(isVisible && error) ||
          (isVisible && message && (
            <PopUp
              hidePopOver={hidePopOver}
              isVisible={isVisible}
              status={`${error ? "error" : "success"}`}
              message={message}
            />
          ))}
        <div className={styles.formBtns}>
          {/* <Filter filterData={filterData} setFilterData={setFilterData} /> */}
          <button onClick={() => setOpenFrom(true)}>
            <span>
              <i className="ri-apps-2-add-line"></i>
            </span>
            <span>Add Products</span>
          </button>
        </div>
        <h3>Product List</h3>
        {!productList ? (
          <Loader
            size="30px"
            color="black"
            containerWidth="100%"
            containerHeight="50vh"
          />
        ) : (
          <>
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
                            {[
                              "For Whom",
                              "Category",
                              "Collection",
                              "Theme",
                              "Price",
                              "Discount",
                            ].includes(header.column.columnDef.header) ? (
                              <>
                                <button className={styles.filterIcon}><i className='ri-filter-2-line'></i></button>
                                {/* {filterItem(header.column.columnDef.header)} */}
                              </>
                            ) : (
                              ""
                            )}
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: <span className="pl-2">⬆️</span>,
                              desc: <span className="pl-2">⬇️</span>,
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
          </>
        )}
        {openFrom && (
          <ProductAddForm
            setOpenFrom={setOpenFrom}
            setIsVisible={setIsVisible}
            setError={setError}
            setMessage={setMessage}
            setIsLoding={setIsLoding}
            isLoading={isLoading}
            productListData={productListData}
          />
        )}
        {openUpdateFrom && (
          <UpdateForm
            setOpenUpdateFrom={setOpenUpdateFrom}
            setIsVisible={setIsVisible}
            setError={setError}
            setMessage={setMessage}
            setIsLoding={setIsLoding}
            isLoading={isLoading}
            idProduct={idProduct}
            productList={productList}
            productListData={productListData}
          />
        )}
      </div>
    </>
  );
}

export default ProductList;
