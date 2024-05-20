import MultiCarousel from "@/core/MultiCarousel";
import ProductCard from "@/components/landingPage/ProductCard";

const BestSellerProducts = ({ products }) => {
  return (
    <div className="py-10 p-5 flex flex-col justify-center bg-gradient-to-b from-darkMagneta-600 to-midnightBlue-700 text-white">
      <div className="flex flex-col items-center space-y-5 mx-auto 2xl:max-w-7xl xl:max-w-5xl lg:max-w-4xl max-w-2xl xl:p-8 lg:p-5 p-3">
        <div className="mb-8 uppercase text-5xl text-center font-bold italic">
          Best sellers
        </div>
        <div className="md:w-full md:max-w-full max-w-80 flex items-start justify-center">
          <MultiCarousel centerMode={false} infinite rightToLeft>
            {products.map((product) => (
              <ProductCard
                key={product.name}
                product={product}
                bgFromColor="from-midnightBlue-700"
                bgToColor="to-darkMagneta-600"
              />
            ))}
          </MultiCarousel>
        </div>
      </div>
    </div>
  );
};

export default BestSellerProducts;
