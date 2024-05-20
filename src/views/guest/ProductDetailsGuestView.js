"use client";

import Layout from "@/layouts/GuestLayout/Layout";
import MultiCarousel from "@/core/MultiCarousel";
import ProductDetailsCard from "@/components/products/ProductDetailsCard";
import * as React from "react";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { hideLoader, showLoader } from "@/app/GlobalRedux/Features/loaderSlice";
import API from "@/helpers/APIServices/API";
import { showErrorToast } from "@/app/GlobalRedux/Features/toastSlice";
import ProductCarousel from "@/components/products/ProductCarousel";
import emptyLottie from "@/images/empty-lottie.json";
import Lottie from "@/core/Lottie";
import { isArrayEmpty } from "@/helpers/functions";
import BackButton from "@/core/buttons/BackButton";
import { ShoppingCart } from "@mui/icons-material";
import Link from "next/link";
import { Tooltip } from "@mui/material";

const breakPoints = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const ProductDetailsGuestView = ({ id }) => {
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [images, setImages] = useState([]);

  const dispatch = useDispatch();

  const handleNavigation = () => {
    dispatch(showLoader("Please wait..."));
  };

  useEffect(() => {
    dispatch(showLoader("Please wait..."));
    API.get(`/api/product/${id}`)
      .then((response) => {
        const { product } = response.data;
        setProductId(product.id);
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setDiscount(product.discount_price);
        setCategory(product.category_id);
        setCategoryName(product.category);
        setImages(
          [
            product.image_1,
            product.image_2,
            product.image_3,
            product.image_4,
          ].filter(Boolean),
        );
      })
      .catch(() => dispatch(showErrorToast("Something went wrong")))
      .finally(() => dispatch(hideLoader()));
  }, []);

  return (
    <Layout>
      <BackButton className="pt-28 pb-12 ml-4" />
      <div className="flex md:flex-row flex-col items-stretch px-4 h-full">
        <div className="flex flex-1 md:w-1/2 px-4">
          <div className="md:w-full md:max-w-full max-w-80 flex items-stretch justify-center">
            {isArrayEmpty(images) ? (
              <Lottie
                animation={emptyLottie}
                className="flex flex-1 object-contain md:w-1/3 md:h-1/3 sm:w-1/2 sm:h-1/2 w-2/3 h-2/3"
                text="No images for this product"
              />
            ) : (
              <MultiCarousel
                breakPoints={breakPoints}
                // infinite={false}
                showDots
                centerMode={false}
              >
                {images.map((image, index) => (
                  <ProductDetailsCard key={index} image={image} />
                ))}
              </MultiCarousel>
            )}
          </div>
        </div>
        <div className="relative flex flex-col flex-1 mx-4 p-4 md:mt-0 mt-8 border-2 border-royalBlue-600 shadow-xl bg-gradient-to-t from-midnightBlue-600 to-darkMagneta-700 rounded-xl md:w-full text-slate-100">
          <div className="text-2xl font-semibold">{name}</div>
          <div className="my-1 text-lg italic text-slate-300">
            Category: {categoryName}
          </div>
          <div className="text-lg font-semibold italic text-pretty mt-8">
            {description}
          </div>
          <div className="absolute bottom-5 w-full flex justify-around items-center text-darkMagneta-600 font-bold">
            {discount > 0 ? (
              <div className="mt-8 flex flex-col">
                <span className="font-semibold text-5xl">${discount}</span>
                <span className="line-through italic ml-2 text-2xl">
                  ${price}
                </span>
              </div>
            ) : (
              <div className="mt-2 items-end text-5xl">
                <span>${price}</span>
              </div>
            )}
            <Tooltip title="Shop this" arrow>
              <Link
                href={{
                  pathname: "/login",
                  query: { product: productId },
                }}
                onClick={handleNavigation}
              >
                <ShoppingCart
                  className="text-orange-300 hover:text-orange-600 hover:scale-105"
                  fontSize="large"
                />
              </Link>
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <ProductCarousel categoryId={category} productId={productId} />
      </div>
    </Layout>
  );
};

export default ProductDetailsGuestView;
