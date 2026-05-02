"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import { Bell, Calendar, CheckCircle, Clock, UserPlus } from "lucide-react";
import { useSyncExternalStore } from "react";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "appointment" | "schedule" | "system" | "user";
  timestamp: Date;
  read: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "New Appointment Scheduled",
    message:
      "You have a new appointment scheduled with Dr. Smith on 2024-07-01 at 10:00 AM.",
    type: "appointment",
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    read: false,
  },
  {
    id: "2",
    title: "Schedule Updated",
    message:
      "Your schedule has been updated. Please check your calendar for details.",
    type: "schedule",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: true,
  },
  {
    id: "3",
    title: "System Maintenance",
    message:
      "Scheduled system maintenance on 2024-07-05 from 12:00 AM to 4:00 AM. Services may be unavailable during this time.",
    type: "system",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    read: false,
  },
  {
    id: "4",
    title: "New User Registered",
    message:
      "A new user has registered with the email address john.doe@example.com.",
    type: "user",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    read: true,
  },
];

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "appointment":
      return <Calendar className="h-4 w-4 text-info" />;
    case "schedule":
      return <Clock className="h-4 w-4 text-success" />;
    case "system":
      return <CheckCircle className="h-4 w-4 text-destructive" />;
    case "user":
      return <UserPlus className="h-4 w-4 text-warning" />;
    default:
      return <Bell className="h-4 w-4 text-muted-foreground" />;
  }
};

const emptySubscribe = () => () => {};

const NotificationDropdown = () => {
  const isHydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const unreadCount = MOCK_NOTIFICATIONS.filter((n) => !n.read).length;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} size={"icon"} className="relative">
          <Bell className="h-4 w-4" />
          <Badge
            className="h-4 w-4 absolute -top-1 -right-1 rounded-full p-0 flex items-center justify-center"
            variant={"destructive"}
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-center">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Badge variant={"secondary"} className="ml-2">
              {unreadCount} new
            </Badge>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <ScrollArea className="h-75">
          {MOCK_NOTIFICATIONS.length > 0 ? (
            MOCK_NOTIFICATIONS.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className="flex flex-col items-start gap-2 p-3 cursor-pointer"
              >
                <div className="mt-0.5">
                  {getNotificationIcon(notification.type)}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium leading-none text-sm">
                      {notification.title}
                    </p>
                    {!notification.read && (
                      <div className="h-2 w-2 rounded-full bg-info" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {notification.message}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {
                      isHydrated
                        ? formatDistanceToNow(notification.timestamp, {
                            addSuffix: true,
                          })
                        : "Loading..." /* Or just an empty string "" */
                    }
                  </p>
                </div>
              </DropdownMenuItem>
            ))
          ) : (
            <p className="p-3 text-sm text-muted-foreground">
              No new notifications.
            </p>
          )}
        </ScrollArea>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="justify-center text-sm text-center"
          disabled={MOCK_NOTIFICATIONS.length === 0}
        >
          View All Notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;
