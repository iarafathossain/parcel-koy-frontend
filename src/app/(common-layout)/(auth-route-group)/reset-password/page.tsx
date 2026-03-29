import ResetPasswordForm from "@/components/modules/auth/reset-password-form";
import { env } from "@/env";
import { parseDurationToSecond } from "@/lib/token-utils";

interface ResetPasswordPageProps {
  searchParams: Promise<{
    email?: string;
  }>;
}

const ResetPasswordPage = async ({ searchParams }: ResetPasswordPageProps) => {
  const params = await searchParams;
  const otpDurationInSeconds = parseDurationToSecond(
    String(env.OTP_EXPIRES_IN),
  );

  return (
    <div className="min-h-screen flex items-start justify-center mt-5">
      <ResetPasswordForm
        initialEmail={params.email}
        otpDurationInSeconds={otpDurationInSeconds}
      />
    </div>
  );
};

export default ResetPasswordPage;
