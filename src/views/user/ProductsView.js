"use client";

import Layout from "@/layouts/UserLayout/Layout";
import ProductCard from "@/components/products/ProductCard";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoader } from "@/app/GlobalRedux/Features/loaderSlice";
import SearchInput from "@/core/inputs/SearchInput";
import UserShoppingCart from "@/layouts/UserShoppingCart";
import API from "@/helpers/APIServices/API";
import { showErrorToast } from "@/app/GlobalRedux/Features/toastSlice";
import * as React from "react";
import Pagination from "@mui/material/Pagination";
import SelectCategoryMenu from "@/components/categories/SelectCategoryMenu";
import withAuth from "@/helpers/auth/userWrapper";
import { useSearchParams } from "next/navigation";

const ProductsView = () => {
  const [products, setProducts] = useState([]);
  const [qs, setQs] = useState("");
  const [category, setCategory] = useState("");
  const [pageCount, setPageCount] = useState(12);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const dispatch = useDispatch();

  const searchParams = useSearchParams();
  const searchProduct = searchParams.get("product");

  const getProducts = () => {
    // dispatch(showLoader("Please wait..."));
    API.get("/api/user/products", {
      params: {
        category_id: !!category.value ? category.value : null,
        limit: pageCount,
        page,
        q: qs,
      },
    })
      .then((response) => {
        const { data, meta } = response.data;
        setProducts(data);
        setTotalCount(meta.last_page);
      })
      .catch(() => dispatch(showErrorToast("Something went wrong")))
      .finally(() => dispatch(hideLoader()));
  };

  const handlePagination = (e, value) => {
    setPage(value);
  };

  useEffect(() => {
    if (!!category) {
      getProducts();
    }
  }, [category, page, qs]);

  useEffect(() => {
    if (!!searchProduct) {
      setQs(searchProduct);
    }
  }, [searchProduct]);

  return (
    <Layout>
      <div className="flex flex-col py-28 bg-gradient-to-t from-midnightBlue-700 to-darkSlateBlue-600 px-4">
        <div className="flex items-center justify-between my-6 mx-2 text-white">
          <SelectCategoryMenu selectedValue={category} onSelect={setCategory} />
          <div className="flex relative w-1/3">
            <SearchInput qs={qs} onSearch={setQs} />
          </div>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-8 gap-4 sm:mx-0 mx-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} canAddToCart />
          ))}
        </div>
        <div className="w-auto max-w-2/3 flex justify-center mt-8">
          <Pagination
            count={totalCount}
            page={page}
            onChange={handlePagination}
            showFirstButton
            showLastButton
            color="secondary"
            siblingCount={2}
          />
        </div>
      </div>
      <UserShoppingCart />
    </Layout>
  );
};

export default withAuth(ProductsView);
