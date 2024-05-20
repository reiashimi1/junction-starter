import MultiCarousel from "@/core/MultiCarousel";
import ProductCard from "@/components/landingPage/ProductCard";

const DiscountProducts = ({ products }) => {
  return (
    <div className="w-auto py-10 p-5 flex flex-col justify-center bg-gradient-to-b from-midnightBlue-700 to-darkMagneta-600 text-white">
      <div className="flex flex-col items-center space-y-5 mx-auto 2xl:max-w-7xl xl:max-w-5xl lg:max-w-4xl max-w-2xl xl:p-8 lg:p-5 p-3">
        <div className="mb-8 uppercase text-2xl text-center font-bold italic">
          Hurry up to profit from the discounts
        </div>
        <div className="md:w-full md:max-w-full max-w-80 flex items-start justify-center">
          <MultiCarousel centerMode={false} infinite>
            {products.map((product) => (
              <ProductCard
                key={product.name}
                product={product}
                bgFromColor="from-darkMagneta-600"
                bgToColor="to-midnightBlue-700"
                showDiscount
              />
            ))}
          </MultiCarousel>
        </div>
      </div>
    </div>
  );
};

export default DiscountProducts;
