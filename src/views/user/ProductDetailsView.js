"use client";

import Layout from "@/layouts/UserLayout/Layout";
import MultiCarousel from "@/core/MultiCarousel";
import ProductDetailsCard from "@/components/products/ProductDetailsCard";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import useValidate from "@/hooks/useValidate";
import { useEffect, useMemo, useState } from "react";
import { hideLoader, showLoader } from "@/app/GlobalRedux/Features/loaderSlice";
import API from "@/helpers/APIServices/API";
import {
  showErrorToast,
  showSuccessToast,
} from "@/app/GlobalRedux/Features/toastSlice";
import withAuth from "@/helpers/auth/userWrapper";
import SimilarProductCarousel from "@/components/products/SimilarProductCarousel";
import { isArrayEmpty } from "@/helpers/functions";
import Lottie from "@/core/Lottie";
import emptyLottie from "@/images/empty-lottie.json";
import { IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { updateCart } from "@/app/GlobalRedux/Features/shoppingCartSlice";
import addToCartValidator from "@/helpers/validators/addToCartValidator";
import { isProductInCart, selectProductById } from "@/app/GlobalRedux/actions";
import UserShoppingCart from "@/layouts/UserShoppingCart";
import BackButton from "@/core/buttons/BackButton";

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

const ProductDetailsView = ({ id }) => {
  const [product, setProduct] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [images, setImages] = useState([]);
  const [quantity, setQuantity] = useState(0);

  const existsInCart = useSelector(isProductInCart(id));
  const productInCart = useSelector(selectProductById(id));
  const dispatch = useDispatch();
  const { clearError, getError, validateErrors } = useValidate();

  const handleMinusClick = () => {
    clearError("quantity");
    setQuantity((prevState) => prevState - 1);
  };

  const handlePlusClick = () => {
    clearError("quantity");
    setQuantity((prevState) => prevState + 1);
  };

  const handleQuantityChange = (e) => {
    clearError("quantity");
    setQuantity(Number(e.target.value));
  };

  const addProductToCart = () => {
    const errors = validateErrors({ quantity }, addToCartValidator);
    if (errors) {
      return;
    }
    dispatch(updateCart({ product, quantity }));
    dispatch(showSuccessToast("Updated the cart"));
  };

  const disabledButton = useMemo(() => quantity <= 1, [quantity]);

  useEffect(() => {
    dispatch(showLoader("Please wait..."));
    API.get(`/api/user/products/${id}`)
      .then((response) => {
        const { product } = response.data;
        setProduct(product);
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
      .catch(() => dispatch(showErrorToast("Could not get product details")))
      .finally(() => dispatch(hideLoader()));
  }, []);

  useEffect(() => {
    if (existsInCart) {
      setQuantity(productInCart.quantity);
    }
  }, []);

  return (
    <Layout>
      <BackButton className="pt-28 pb-12 ml-4" />
      <div className="flex md:flex-row flex-col items-stretch px-4">
        <div className="flex flex-1 md:w-1/2 px-4 justify-center">
          <div className="md:w-full sm:max-w-full max-w-80 flex items-stretch justify-center">
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
        <div className="relative flex flex-col flex-1 mx-4 p-4 md:mt-0 mt-8 border-2 border-royalBlue-600 shadow-xl bg-gradient-to-r from-slate-300 to-slate-400 rounded-xl md:w-full">
          <div className="text-2xl font-semibold">{name}</div>
          <div className="my-1 text-lg italic">Category: {categoryName}</div>
          <div className="text-lg font-semibold italic text-pretty mt-8">
            {description}
          </div>
          <div className="mt-12 text-darkMagneta-600 font-bold">
            {discount != null && discount > 0 ? (
              <div className="mt-8 flex flex-col">
                <span className="font-semibold text-3xl">${discount}</span>
                <span className="line-through italic ml-2 text-xl">
                  ${price}
                </span>
              </div>
            ) : (
              <div className="mt-2 items-end text-3xl">
                <span>${price}</span>
              </div>
            )}
          </div>
          <div className="flex justify-end items-end space-x-2 mt-8">
            <div className="justify-center">
              <div className="flex items-center justify-center bg-gray-200 rounded-xl max-w-1/4">
                <IconButton
                  onClick={handleMinusClick}
                  disabled={disabledButton}
                >
                  <Remove />
                </IconButton>
                <input
                  className="mx-2 w-12 text-xl font-semibold bg-gray-200 text-center focus:outline-none appearance-none"
                  value={quantity}
                  type="number"
                  step={1}
                  onChange={handleQuantityChange}
                />
                <IconButton onClick={handlePlusClick}>
                  <Add />
                </IconButton>
              </div>
            </div>
            <div>
              <button
                className="py-2 w-40 rounded-xl bg-darkMagneta-300 hover:bg-gradient-to-r hover:from-darkMagneta-200 hover:to-darkMagneta-700 shadow-xl"
                onClick={addProductToCart}
              >
                Add to cart
              </button>
            </div>
          </div>
          {existsInCart && (
            <div className="flex justify-end mt-2 italic font-semibold text-orange-800">
              There are already {productInCart.quantity} products in the cart
            </div>
          )}
          {!!getError("quantity") && (
            <span className="text-red-600 text-sm py-1 text-end mt-2">
              {getError("quantity")}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <SimilarProductCarousel
          categoryId={category}
          productId={product.id}
          canAddToCart
        />
      </div>
      <UserShoppingCart />
    </Layout>
  );
};

export default withAuth(ProductDetailsView);
