import VerifyEmailForm from "@/components/modules/auth/verify-email-form";
import { env } from "@/env";
import { parseDurationToSecond } from "@/lib/token-utils";

interface VerifyEmailPageProps {
  searchParams: Promise<{
    email?: string;
  }>;
}

const VerifyEmailPage = async ({ searchParams }: VerifyEmailPageProps) => {
  const params = await searchParams;
  const otpDurationInSeconds = parseDurationToSecond(
    String(env.OTP_EXPIRES_IN),
  );

  return (
    <div className="min-h-screen flex items-start justify-center mt-5">
      <VerifyEmailForm
        initialEmail={params.email}
        otpDurationInSeconds={otpDurationInSeconds}
      />
    </div>
  );
};

export default VerifyEmailPage;
