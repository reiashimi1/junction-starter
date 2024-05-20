"use client";

import LandingCard from "@/components/landingPage/LandingCard";
import OffersCard from "@/components/landingPage/OffersCard";
import Footer from "@/components/landingPage/Footer";
import Layout from "@/layouts/GuestLayout/Layout";
import BestSellerProducts from "@/components/landingPage/BestSellerProducts";
import DiscountProducts from "@/components/landingPage/DiscountProducts";
import LastStockProducts from "@/components/landingPage/LastStockProducts";
import DontWait from "@/components/landingPage/DontWait";
import GuestAPI from "@/helpers/APIServices/GuestAPI";
import { useDispatch } from "react-redux";
import { showErrorToast } from "@/app/GlobalRedux/Features/toastSlice";
import { useEffect, useState } from "react";

const LandingPageView = () => {
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [topDiscountProducts, setTopDiscountProducts] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // GuestAPI.get("/api/main")
    //   .then((response) => {
    //     const { lowStockProducts, topDiscountProducts, topProducts } =
    //       response.data;
    //     setLowStockProducts(lowStockProducts);
    //     setTopDiscountProducts(topDiscountProducts);
    //     setTopProducts(topProducts);
    //   })
      // .catch(() => dispatch(showErrorToast("Something went wrong")));
  }, [dispatch]);

  return (
    <Layout>
      <LandingCard />
      <OffersCard />
      <DiscountProducts products={topDiscountProducts} />
      <BestSellerProducts products={topProducts} />
      <LastStockProducts products={lowStockProducts} />
      <DontWait />
      <Footer />
    </Layout>
  );
};

export default LandingPageView;
