import UserDetailView from "@/views/admin/UserDetailView";

const UserDetails = ({ params }) => {
  return <UserDetailView userId={params.id} />;
};

export default UserDetails;
