"use client";

import ChatAgent from "@/components/ai/customer-agent";
import { Hand, MessageCircleMore, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export default function CustomerChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(true);

  return (
    <div className="fixed bottom-4 right-4 z-70 sm:bottom-5 sm:right-5">
      <TooltipProvider delayDuration={150}>
        {isOpen ? (
          <div className="mb-3 flex h-[min(34rem,calc(100vh-7rem))] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-border/70 bg-card shadow-[0_22px_70px_-24px_rgba(15,23,42,0.45)] backdrop-blur xl:w-96">
            <div className="flex items-center justify-between border-b border-border/70 bg-background/95 px-4 py-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-muted shadow-inner ring-1 ring-border/70">
                  <Image
                    src="/logo-mini.png"
                    alt="parcelKoy"
                    width={100}
                    height={100}
                    className="h-7 w-7 object-contain"
                    priority
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-semibold text-foreground">
                      parcelKoy Support
                    </p>
                    <span className="inline-flex size-2 rounded-full bg-secondary shadow-[0_0_0_4px_color-mix(in_oklch,var(--secondary)_20%,transparent)]" />
                  </div>
                  <p className="truncate text-xs text-muted-foreground">
                    Ask anything about delivery and parcel services
                  </p>
                </div>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="shrink-0 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="size-4" />
              </Button>
            </div>

            <div className="flex min-h-0 flex-1 p-3">
              <ChatAgent />
            </div>
          </div>
        ) : null}

        {!isOpen ? (
          <Tooltip open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
            <TooltipTrigger asChild>
              <Button
                variant="default"
                size="icon"
                type="button"
                onClick={() => setIsOpen(true)}
                aria-label="Open customer chat"
                className="group relative size-14 rounded-full border border-border/60 bg-linear-to-br from-primary via-primary to-secondary text-primary-foreground shadow-[0_18px_40px_-18px_rgba(30,64,175,0.65)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_22px_48px_-18px_rgba(30,64,175,0.72)] focus-visible:ring-4 focus-visible:ring-ring/30"
              >
                <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                <span className="absolute -inset-1 rounded-full bg-secondary/20 blur-md transition-opacity duration-200 group-hover:opacity-90" />
                <MessageCircleMore className="relative size-6 transition-transform duration-200 group-hover:scale-110" />
                <Hand className="absolute top-2 right-2 size-4 animate-bounce text-secondary-foreground drop-shadow-sm" />
                <span className="absolute -top-1 -right-1 size-3 rounded-full border-2 border-background bg-secondary shadow-sm" />
              </Button>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              sideOffset={12}
              className="max-w-[16rem] px-3 py-2"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium">
                  <Hand className="size-3.5 animate-bounce" />
                  <span>How can we help you?</span>
                </span>

                <X
                  onClick={() => setIsTooltipOpen(false)}
                  aria-label="Close tooltip"
                  className="size-3.5"
                />
              </div>
            </TooltipContent>
          </Tooltip>
        ) : null}
      </TooltipProvider>
    </div>
  );
}
