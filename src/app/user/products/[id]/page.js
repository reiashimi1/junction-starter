import ProductDetailsView from "@/views/user/ProductDetailsView";

const ProductDetails = ({ params }) => {
  return <ProductDetailsView id={params.id} />;
};

export default ProductDetails;
