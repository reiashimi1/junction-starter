import React, { useEffect, useMemo, useState } from "react";
import { Add, Clear, Remove } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";

const CartProduct = ({ product }) => {
  const [quantity, setQuantity] = useState(0);

  const dispatch = useDispatch();

  const handleMinusClick = () => {
    // dispatch(updateCart({ product, quantity: quantity - 1 }));
  };

  const handlePlusClick = () => {
    // dispatch(updateCart({ product, quantity: quantity + 1 }));
  };

  const handleQuantityChange = (e) => {
    // dispatch(updateCart({ product, quantity: Number(e.target.value) }));
  };

  const removeProductFromCart = () => {
    // dispatch(removeProduct(product.id));
  };

  const disabledButton = useMemo(() => quantity <= 1, [quantity]);

  useEffect(() => {
    setQuantity(product.quantity);
  }, [product]);

  return (
    <div className="relative flex md:flex-row flex-col md:space-y-none space-y-2 flex-1 py-6 md:px-4 bg-white rounded-xl shadow-lg flex justify-around items-center my-4">
      {/*<img*/}
      {/*  src={prepareImagePath(product?.main_image || product?.image_1)}*/}
      {/*  className="h-16 object-contain w-1/4"*/}
      {/*  alt={product.name}*/}
      {/*/>*/}
      <div className="flex flex-col space-y-2 text-lg font-semibold text-center md:w-1/2 md:px-4">
        <div>{product.name}</div>
        {!!product?.discount_price ? (
          <div className="flex sm:flex justify-center text-orange-400">
            <span className="font-semibold text-xl">
              ${product.discount_price}
            </span>
            <span className="line-through italic ml-2 text-lg">
              ${product.price}
            </span>
          </div>
        ) : (
          <div className="mt-2 items-end text-xl text-orange-400">
            <span>${product.price}</span>
          </div>
        )}
      </div>
      <div className="flex items-center justify-center bg-gray-200 rounded-xl md:max-w-1/4">
        <div className={`${disabledButton ? "cursor-not-allowed" : ""}`}>
          <IconButton onClick={handleMinusClick} disabled={disabledButton}>
            <Remove />
          </IconButton>
        </div>
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
      <Clear
        className="absolute top-1 left-1 h-5 text-gray-500 hover:cursor-pointer rounded-full hover:text-primary-600 hover:bg-gray-200"
        onClick={removeProductFromCart}
      />
    </div>
  );
};

export default CartProduct;
