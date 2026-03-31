import RegisterForm from "@/components/modules/auth/register-form";
import { formattedQueryString } from "@/helpers/formatted-query-string";
import { areaServices } from "@/services/area-service";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const RegisterPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined | string[] }>;
}) => {
  const queryClient = new QueryClient();

  const searchObject = await searchParams;

  const queryString = formattedQueryString(searchObject);

  await queryClient.prefetchQuery({
    queryKey: ["areas"],
    queryFn: () => areaServices.getAllAreas(queryString),
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
