import { prepareImagePath } from "@/helpers/functions";

const ProductDetailsCard = ({ image }) => {
  return (
    <div className="flex flex-col flex-1 items-center relative mx-2 border rounded-lg h-full pb-24 p-3 bg-gradient-to-t from-midnightBlue-600 to-darkOrchid-700 cursor-pointer text-white">
      <div className="bg-none flex items-center justify-center p-2">
        <img
          src={prepareImagePath(image)}
          className="h-60 object-contain"
          alt="product"
        />
      </div>
    </div>
  );
};
export default ProductDetailsCard;
