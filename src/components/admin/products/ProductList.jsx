import React, { useEffect, useMemo, useState } from "react";
import styles from "./productList.module.css";
import ProductAddForm from "./form/ProductAddForm";
import PopUp from "../../common/popUp/PopUp";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../../context/Firebase";
import Loader from "../../common/loader/Loader";
import { capitalize, getDate } from "./form/helper";
import DeleteProduct from "./deleteProduct/DeleteProduct";
import UpdateForm from "./updateProductDetails/UpdateForm";
import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import Pagination from "./tableComponents/padination.jsx/Pagination";
import Table from "./tableComponents/table/Table";
import { priceListForFilter } from "./helper/helperFuctions";

function ProductList() {
  const columnHelper = createColumnHelper();
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
  const [columnFilters, setColumnFilters] = useState([]);

  // Some necessary functions [start]-------------------

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

  // Some necessary functions [end]-------------------

  function myCustomFilterFn(row, columnId, filterValue) {
    return row.getValue(columnId) === filterValue;
  }

  useEffect(() => {
    productListData();
  }, []);

  //Product Filtering [Start]--------------------------------

  const filteredProducts = useMemo(() => {

    let temp = productList;
    columnFilters.forEach((filter) => {
      if (filter.value !== "all") {
        if (filter.id === "price") {
          temp = temp.filter(
            (product) =>
              Number(product[filter.id]) >
              priceListForFilter[filter.value].min &&
              Number(product[filter.id]) < priceListForFilter[filter.value].max
          );
        } else if (filter.id === "discount") {
          temp = temp.filter(
            (product) => Number(product[filter.id]) === Number(filter.value)
          );
        } else {
          temp = temp.filter((product) => product[filter.id] === filter.value);
        }
      } else {
        return productList;
      }
    });
    return temp;
  }, [productList, columnFilters]);

  //Product Filtering [End]--------------------------------

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
      filterFn: "myCustomFilterFn",
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
  ];

  const table = useReactTable({
    data: filteredProducts,
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
    filterFns: {
      myCustomFilterFn,
    },
  });

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
            <Pagination table={table} productList={productList} />
            <div className={styles.tableOuterContainer}>
              <Table table={table} sortingHeading={[
                "Product Name",
                "Price",
                "Discount",
                "Product Adding date",
              ]} />
            </div>
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
