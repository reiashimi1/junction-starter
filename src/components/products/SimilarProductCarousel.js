import { hideLoader, showLoader } from "@/app/GlobalRedux/Features/loaderSlice";
import API from "@/helpers/APIServices/API";
import { showErrorToast } from "@/app/GlobalRedux/Features/toastSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import MultiCarousel from "@/core/MultiCarousel";
import SimilarProductCard from "@/components/products/SimilarProductCart";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const SimilarProductCarousel = ({ categoryId, productId, canAddToCart = false }) => {
  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();

  const getProducts = () => {
    dispatch(showLoader("Please wait..."));
    API.get("/api/products", {
      params: {
        category_id: categoryId,
      },
    })
      .then((response) => {
        const products = response.data.data;
        const filteredProducts = products.filter(
          (product) => product.id !== productId,
        );
        setProducts(filteredProducts);
      })
      .catch(() => dispatch(showErrorToast("Something went wrong")))
      .finally(() => dispatch(hideLoader()));
  };

  useEffect(() => {
    if (!!categoryId) {
      getProducts();
    }
  }, [categoryId, productId]);

  return (
    <div className="flex flex-col items-center space-y-5 mx-auto 2xl:max-w-7xl xl:max-w-5xl lg:max-w-4xl max-w-2xl xl:p-8 lg:p-5 p-3">
      <div className="mt-16 text-white text-xl text-pretty italic text-center">
        Explore products of the same category:
      </div>
      <div className="md:w-full sm:max-w-full max-w-80 flex items-stretch justify-center">
        <MultiCarousel centerMode={false} breakPoints={responsive}>
          {products.map((product) => (
            <SimilarProductCard
              key={product.name}
              product={product}
              bgFromColor="from-darkMagneta-600"
              bgToColor="to-midnightBlue-700"
              canAddToCart={canAddToCart}
            />
          ))}
        </MultiCarousel>
      </div>
    </div>
  );
};

export default SimilarProductCarousel;
