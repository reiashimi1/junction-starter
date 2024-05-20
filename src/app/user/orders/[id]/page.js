import MyOrdersView from "@/views/user/MyOrderView";

const Order = ({ params }) => {
  return <MyOrdersView orderId={params.id} />;
};

export default Order;
