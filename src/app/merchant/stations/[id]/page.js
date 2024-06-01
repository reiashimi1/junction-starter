import StationDetailsView from "@/views/merchant/StationDetailsView";

const StationChargePointsPage = ({ params }) => {
  return <StationDetailsView id={params.id} />;
};

export default StationChargePointsPage;
