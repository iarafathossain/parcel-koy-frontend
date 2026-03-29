"use client";

import { IJwtPayload } from "@/types/auth-type";

interface UserLabelPros {
  userInfo: IJwtPayload;
}

const UserLabel = ({ userInfo }: UserLabelPros) => {
  return (
    <div className="border-t px-3 py-4">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-sm font-semibold text-primary">
            {userInfo.name.charAt(0).toUpperCase()}
          </span>
        </div>

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
