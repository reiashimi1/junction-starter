import { ShoppingCart } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { showLoader } from "@/app/GlobalRedux/Features/loaderSlice";
import { updateCart } from "@/app/GlobalRedux/Features/shoppingCartSlice";
import { isProductInCart } from "@/app/GlobalRedux/actions";
import { prepareImagePath } from "@/helpers/functions";

const ProductCard = ({ product, canAddToCart = false }) => {
  const existsInCart = useSelector(isProductInCart(product?.id));

  const router = useRouter();
  const dispatch = useDispatch();

  const addToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const quantity = 1;
    dispatch(updateCart({ product, quantity }));
  };

  const viewDetails = () => {
    dispatch(showLoader("Please wait to see product details"));
    if (canAddToCart) {
      router.push(`/user/products/view?id=${product.id}`);
    } else {
      router.push(`/products/view?id=${product.id}`);
    }
  };

  return (
    <div
      className={`flex flex-col flex-1 items-center relative mx-2 border rounded-lg h-full ${canAddToCart ? "pb-24" : "pb-16"} p-3 bg-gradient-to-t from-midnightBlue-600 to-darkOrchid-700 cursor-pointer text-white hover:scale-105 transition duration-300`}
      onClick={viewDetails}
    >
      <div className="mt-2 text-2xl h-24">{product.name}</div>
      <div className="bg-none flex items-center justify-center p-2">
        <img
          src={prepareImagePath(product.main_image)}
          className="h-60 object-contain"
          alt={product.name}
        />
      </div>
      <div className="mt-2 h-16">
        {product.description.slice(0, 50)}
        {product.description.length > 50 && <span>...</span>}
        {/*  display category instead of description here??*/}
      </div>
      {product.discount_price != null && product.discount_price > 0 ? (
        <div className="mt-2 flex text-orange-400 items-center pt-4">
          <span className="line-through font-semibold italic mr-4">
            ${product.price}
          </span>
          <span className="font-bold text-3xl">${product.discount_price}</span>
        </div>
      ) : (
        <div className="mt-2 items-end font-semibold text-3xl text-orange-400 pt-4">
          <span>${product.price}</span>
        </div>
      )}
      {/*Leave option to remove from cart here or no?*/}
      {canAddToCart && (
        <div className="absolute bottom-2 hover:cursor-pointer mb-4">
          {existsInCart ? (
            <div className="flex text-green-500 font-semibold">
              Added to Cart
            </div>
          ) : !product.stock ? (
            <div className="text-lg uppercase text-red-500">
              Out of stock
            </div>
          ) : (
            <Tooltip title="Add to Cart" arrow onClick={addToCart}>
              <div className="flex text-slate-300 hover:text-orange-500 hover:scale-105">
                <div>Add</div>
                <ShoppingCart className="ml-2" />
              </div>
            </Tooltip>
          )}
        </div>
      )}
    </div>
  );
};
export default ProductCard;
