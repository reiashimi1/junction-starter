import { ShoppingCart } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import Link from "next/link";
import { prepareImagePath } from "@/helpers/functions";
import { useDispatch } from "react-redux";
import { showLoader } from "@/app/GlobalRedux/Features/loaderSlice";
import { useRouter } from "next/navigation";

const SimilarProductCard = ({
  product,
  bgFromColor = "from-darkViolet-600",
  bgToColor = "from-plum-900",
  canAddToCart = false,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleNavigation = () => {
    dispatch(showLoader("Please wait..."));
  };

  const viewDetails = () => {
    handleNavigation();
    if (canAddToCart) {
      router.push(`/user/products/view?id=${product.id}`);
    } else {
      router.push(`/products/view?id=${product.id}`);
    }
  };

  return (
    <div
      className={`flex flex-col flex-1 mx-2 border border-plum-800 rounded-lg h-full pb-28 p-3 bg-gradient-to-t ${bgFromColor} ${bgToColor} cursor-pointer hover:scale-105 transition`}
      onClick={viewDetails}
    >
      <div className="bg-none flex items-center justify-center p-2">
        <img
          src={prepareImagePath(product.image_1 || product.main_image)}
          className="h-60 object-contain"
          alt={product.name}
        />
      </div>
      <div className="mt-2 text-center text-xl font-semibold h-24">
        {product.name}
      </div>
      <div className="mt-2 italic">
        {product.description.slice(0, 50)}
        {product.description.length > 50 && <span>...</span>}
      </div>
      {product.discount_price != null && product.discount_price > 0 ? (
        <div className="mt-8 flex flex-col fixed bottom-5 left-5 text-orange-400">
          <span className="font-semibold text-3xl">
            ${product.discount_price}
          </span>
          <span className="line-through italic ml-2 text-xl">
            ${product.price}
          </span>
        </div>
      ) : (
        <div className="mt-2 items-end fixed bottom-5 left-5 text-xl text-orange-400">
          <span>${product.price}</span>
        </div>
      )}
      <div className="fixed bottom-2 right-2 hover:cursor-pointer">
        <Tooltip title="Shop this" arrow>
          <Link
            href={`/user/products/view?id=${product.id}`}
            onClick={handleNavigation}
          >
            <ShoppingCart className="text-slate-300 hover:text-orange-500 hover:scale-105 mr-5 mb-3" />
          </Link>
        </Tooltip>
      </div>
    </div>
  );
};
export default SimilarProductCard;
