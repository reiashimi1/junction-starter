import CartProduct from "@/components/cart/CartProduct";
import { isArrayEmpty } from "@/helpers/functions";
import emptyLottie from "@/images/empty-lottie.json";
import Lottie from "@/core/Lottie";
import * as React from "react";

const OrderProducts = ({ products }) => {
  return (
    <div className="bg-slate-200 p-4 w-full rounded-lg shadow-xl ms:mb-0 mb-8">
      <div className="text-xl text-center text-indigo-600 font-semibold">
        Products
      </div>
      {!isArrayEmpty(products) ? (
        products.map((product, index) => (
          <CartProduct key={index} product={product} />
        ))
      ) : (
        <Lottie
          animation={emptyLottie}
          className="flex flex-1 object-contain md:w-1/3 md:h-1/3 sm:w-1/2 sm:h-1/2 w-2/3 h-2/3"
          text="No products in cart"
        />
      )}
    </div>
  );
};

export default OrderProducts;
