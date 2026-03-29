"use client";

import UpdateAdminProfileForm from "@/components/modules/admin/my-profile/update-admin-profile-form";
import UpdateMerchantProfileForm from "@/components/modules/merchant/my-profile/update-merchant-profile-form";
import UpdateRiderProfileForm from "@/components/modules/rider/my-profile/update-rider-profile-form";
import CommonModal from "@/components/shared/modal/common-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Role, RoleType } from "@/types/enum-type";
import { IUser } from "@/types/user-type";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

interface MyProfileViewProps {
  user: IUser | null;
}

const getRoleLabel = (role: RoleType): string => {
  return role.toLowerCase().replace("_", " ");
};

const MyProfileView = ({ user }: MyProfileViewProps) => {
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const profileMetaItems = useMemo(() => {
    if (!user) return [];

    return [
      { label: "Email", value: user.email },
      { label: "Contact", value: user.contactNumber || "N/A" },
      { label: "Gender", value: user.gender || "N/A" },
      { label: "Role", value: getRoleLabel(user.role) },
      { label: "Status", value: user.status || "N/A" },
      {
        label: "Email Verified",
        value: user.emailVerified ? "Verified" : "Not Verified",
      },
    ];
  }, [user]);

  const handleUpdateSuccess = () => {
    setIsEditModalOpen(false);
    router.refresh();
  };

  if (!user) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 py-6">
        <Card>
          <CardHeader>
            <CardTitle>My Profile</CardTitle>
            <CardDescription>
              Unable to load your profile information right now.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const renderRoleSpecificInfo = () => {
    if (user.role === Role.ADMIN || user.role === Role.SUPER_ADMIN) {
      return (
        <div className="space-y-2 text-sm">
          <p>
            <span className="font-medium">Present Address:</span>{" "}
            {user.adminProfile?.presentAddress || "N/A"}
          </p>
          <p>
            <span className="font-medium">Permanent Address:</span>{" "}
            {user.adminProfile?.permanentAddress || "N/A"}
          </p>
        </div>
      );
    }

    if (user.role === Role.MERCHANT) {
      return (
        <div className="space-y-2 text-sm">
          <p>
            <span className="font-medium">Business Name:</span>{" "}
            {user.merchantProfile?.businessName || "N/A"}
          </p>
          <p>
            <span className="font-medium">Pickup Address:</span>{" "}
            {user.merchantProfile?.pickupAddress || "N/A"}
          </p>
          <p>
            <span className="font-medium">Origin Area:</span>{" "}
            {user.merchantProfile?.originArea.name || "N/A"}
          </p>
        </div>
      );
    }

    if (user.role === Role.RIDER) {
      return (
        <div className="space-y-2 text-sm">
          <p>
            <span className="font-medium">Present Address:</span>{" "}
            {user.riderProfile?.presentAddress || "N/A"}
          </p>
          <p>
            <span className="font-medium">Permanent Address:</span>{" "}
            {user.riderProfile?.permanentAddress || "N/A"}
          </p>
          <p>
            <span className="font-medium">Age:</span>{" "}
            {user.riderProfile?.age || "N/A"}
          </p>
        </div>
      );
    }

    return null;
  };

  const renderUpdateForm = () => {
    if (
      (user.role === Role.ADMIN || user.role === Role.SUPER_ADMIN) &&
      user.adminProfile
    ) {
      return (
        <UpdateAdminProfileForm
          adminProfile={user.adminProfile}
          onSuccess={handleUpdateSuccess}
        />
      );
    }

    if (user.role === Role.MERCHANT && user.merchantProfile) {
      return (
        <UpdateMerchantProfileForm
          merchantProfile={user.merchantProfile}
          onSuccess={handleUpdateSuccess}
        />
      );
    }

    if (user.role === Role.RIDER && user.riderProfile) {
      return (
        <UpdateRiderProfileForm
          riderProfile={user.riderProfile}
          onSuccess={handleUpdateSuccess}
        />
      );
    }

    return (
      <p className="text-sm text-muted-foreground">
        No editable profile data found for your role.
      </p>
    );
  };

  const modalTitle =
    user.role === Role.MERCHANT
      ? "Update Merchant Profile"
      : user.role === Role.RIDER
        ? "Update Rider Profile"
        : "Update Admin Profile";

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div>
            <CardTitle className="text-2xl">My Profile</CardTitle>
            <CardDescription>
              View your profile details and keep your information up to date.
            </CardDescription>
          </div>

          <Button onClick={() => setIsEditModalOpen(true)}>
            Update Profile
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center text-lg font-semibold uppercase">
              {user.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <Badge className="ml-auto capitalize">
              {getRoleLabel(user.role)}
            </Badge>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profileMetaItems.map((item) => (
              <div key={item.label} className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="text-sm font-medium capitalize">{item.value}</p>
              </div>
            ))}
          </div>

          <Separator />

          <div>
            <h4 className="mb-3 text-sm font-semibold text-muted-foreground uppercase">
              Role Specific Information
            </h4>
            {renderRoleSpecificInfo()}
          </div>
        </CardContent>
      </Card>

      <CommonModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={modalTitle}
      >
        {renderUpdateForm()}
      </CommonModal>
    </div>
  );
};

export default MyProfileView;
