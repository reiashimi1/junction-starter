"use client";

import Layout from "@/layouts/UserLayout/Layout";
import OrderDetails from "@/components/cart/OrderDetails";
import OrderProducts from "@/components/cart/OrderProducts";
import { useSelector } from "react-redux";
import { calculateTotal, getCartProducts } from "@/app/GlobalRedux/actions";
import withAuth from "@/helpers/auth/userWrapper";

const UserCartView = () => {
  const products = useSelector(getCartProducts());
  const totalAmount = useSelector(calculateTotal());

  return (
    <Layout>
      <div className="flex md:flex-row flex-col-reverse h-full md:space-x-5 py-28 px-4">
        <OrderDetails products={products} total={totalAmount} />
        <OrderProducts products={products} />
      </div>
    </Layout>
  );
};

export default withAuth(UserCartView);
