import MyProfileView from "@/components/modules/dashboard/my-profile/my-profile-view";
import { userServices } from "@/services/user-service";

const MyProfilePage = async () => {
  const user = await userServices.getUserInfo();

  return <MyProfileView user={user} />;
};

export default MyProfilePage;
