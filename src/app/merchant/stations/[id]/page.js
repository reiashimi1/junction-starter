import StationChargePointView from "@/views/merchant/StationChargePointView";

const StationChargePointsPage = ({ params }) => {
  return <StationChargePointView id={params.id} />;
};

export default StationChargePointsPage;
