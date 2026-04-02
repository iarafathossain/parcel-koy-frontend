import { PayoutStatusType } from "./enum-type";

interface IPayoutUser {
  id?: string;
  name?: string;
  email?: string;
  contactNumber?: string;
  image?: string | null;
}

interface IPayoutMerchant {
  id?: string;
  businessName?: string;
  user?: IPayoutUser;
}

interface IPayoutPaymentAccount {
  id?: string;
  providerType?: string;
  stripeConnectAccountId?: string;
  isDefault?: boolean;
  isActive?: boolean;
}

type IPaymentGatewayData = Record<string, unknown>;

export interface IPayout {
  id: string;
  payoutId?: string;
  amount: number | string;
  status: PayoutStatusType | string;
  transactionId?: string | null;
  adminNote?: string | null;
  merchantId?: string;
  paymentAccountId?: string;
  paymentGatewayData?: IPaymentGatewayData | null;
  createdAt: string;
  updatedAt?: string;
  processedAt?: string | null;
  note?: string | null;
  merchant?: IPayoutMerchant;
  paymentAccount?: IPayoutPaymentAccount;
}
