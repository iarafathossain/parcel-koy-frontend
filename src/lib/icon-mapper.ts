import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";

export const iconMapper = (iconName: string) => {
  const iconComponent = Icons[iconName as keyof typeof Icons];

  if (!iconComponent) {
    return Icons.HelpCircle;
  }

  return iconComponent as LucideIcon;
};
