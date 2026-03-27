import RegisterForm from "@/components/modules/auth/register-form";
import { areaServices } from "@/services/area-service";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const RegisterPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["areas"],
    queryFn: areaServices.getAllAreas,
  });

  return (
    <div className="min-h-screen flex items-center justify-center">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <RegisterForm />
      </HydrationBoundary>
    </div>
  );
};

export default RegisterPage;
