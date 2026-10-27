"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IJwtPayload } from "@/types/auth-type";

interface UserLabelPros {
  userInfo: IJwtPayload;
}

const UserLabel = ({ userInfo }: UserLabelPros) => {
  return (
    <div className="border-t px-3 py-4">
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage
            src={userInfo.image || undefined}
            alt={`${userInfo.name}'s avatar`}
          />
          <AvatarFallback className="text-sm font-semibold">
            {userInfo.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 overflow-hidden">
          <p className="text-sm font-medium truncate">{userInfo.name}</p>
          <p className="text-xs text-muted-foreground capitalize">
            {userInfo.role.toLocaleLowerCase().replace("_", " ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLabel;
