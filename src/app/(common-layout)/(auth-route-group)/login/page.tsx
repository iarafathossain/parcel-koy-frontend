import LoginForm from "@/components/modules/auth/login-form";

interface LoginParams {
  searchParams: Promise<{
    redirectTo?: string;
  }>;
}

const LoginPage = async ({ searchParams }: LoginParams) => {
  const params = await searchParams;

  const redirectTo = params.redirectTo;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoginForm redirectTo={redirectTo} />
    </div>
  );
};

export default LoginPage;
