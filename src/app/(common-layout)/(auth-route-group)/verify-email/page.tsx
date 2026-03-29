import VerifyEmailForm from "@/components/modules/auth/verify-email-form";

interface VerifyEmailPageProps {
  searchParams: Promise<{
    email?: string;
  }>;
}

const VerifyEmailPage = async ({ searchParams }: VerifyEmailPageProps) => {
  const params = await searchParams;

  return (
    <div className="min-h-screen flex items-start justify-center mt-5">
      <VerifyEmailForm initialEmail={params.email} />
    </div>
  );
};

export default VerifyEmailPage;
