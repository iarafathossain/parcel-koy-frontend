"use client";

import { logoutAction } from "@/actions/auth-action";
import { ThemeSwitch } from "@/components/shared/theme-switch";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { useUser } from "@/hooks/use-user";
import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import { publicNavbarItems } from "@/lib/nav-items";
import { LocateFixed, LogOut, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const { user, isFetching, isLoading } = useUser();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isMobile = useIsMobile();
  const router = useRouter();

  const dashboardHref = user ? getDefaultDashboardRoute(user.role) : "/login";

  return (
    <div className="h-16 shrink-0 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="relative container mx-auto flex h-full items-center justify-between gap-3 px-4">
        <Sheet open={isOpen && isMobile} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon" aria-label="Open navigation">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-[86%] max-w-sm p-0">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

            <div className="flex h-full flex-col">
              <div className="flex h-16 items-center border-b px-4">
                <Link href="/" onClick={() => setIsOpen(false)}>
                  <Image
                    src="/logo.png"
                    alt="ParcelKoy Courier"
                    width={220}
                    height={44}
                    priority
                  />
                </Link>
              </div>

              <div className="flex-1 space-y-1 p-4">
                {publicNavbarItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                  >
                    {item.title}
                  </Link>
                ))}
                <Link
                  href="/track-parcel"
                  onClick={() => setIsOpen(false)}
                  className="mt-2 flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-primary hover:bg-primary/10"
                >
                  <LocateFixed className="h-4 w-4" />
                  <span>Track Parcel</span>
                </Link>
              </div>

              <div className="border-t p-4">
                {isFetching || isLoading ? (
                  <div className="animate-pulse space-y-2">
                    <div className="h-4 w-3/4 rounded bg-muted" />
                    <div className="h-4 w-1/2 rounded bg-muted" />
                  </div>
                ) : null}
                {user && !isFetching && !isLoading ? (
                  <div className="grid grid-cols-2 gap-2">
                    <Button asChild variant="outline">
                      <Link
                        href={dashboardHref}
                        onClick={() => setIsOpen(false)}
                      >
                        Dashboard
                      </Link>
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={async () => {
                        await logoutAction();
                        router.replace("/login");
                        setTimeout(() => {
                          window.location.reload();
                        }, 0);
                      }}
                    >
                      <LogOut className="mr-1 h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <Button asChild variant="outline">
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        Login
                      </Link>
                    </Button>
                    <Button asChild>
                      <Link href="/register" onClick={() => setIsOpen(false)}>
                        Sign Up
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="ParcelKoy Courier"
            width={230}
            height={46}
            priority
            className="h-auto w-42.5 md:w-52.5"
          />
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center justify-center gap-8 md:flex">
          {publicNavbarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[15px] font-medium text-foreground/85 transition-colors hover:text-foreground"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-3 md:flex">
          <Link
            href="/track-parcel"
            className="flex items-center gap-2 text-base font-semibold text-primary transition-opacity hover:opacity-80"
          >
            <LocateFixed className="h-4 w-4" />
            <span>Track Parcel</span>
          </Link>

          {user ? (
            <>
              <Button asChild variant="ghost" className="px-3 text-base">
                <Link href={dashboardHref}>Dashboard</Link>
              </Button>
              <Button
                variant="destructive"
                className="h-11 px-5 text-base"
                onClick={async () => {
                  await logoutAction();
                  router.replace("/login");
                  setTimeout(() => {
                    window.location.reload();
                  }, 0);
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" className="px-3 text-base">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild className="h-12 px-6 text-lg font-semibold">
                <Link href="/register">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
        <ThemeSwitch />
      </div>
    </div>
  );
};

export default Navbar;
