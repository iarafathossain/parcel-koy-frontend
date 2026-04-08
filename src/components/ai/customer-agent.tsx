"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Loader2, SendHorizonal, Sparkles } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { toast } from "sonner";

type ChatRole = "assistant" | "user";

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

const initialMessages: ChatMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    content: "Hi 👋 How can we help you with parcel delivery today?",
  },
];

const createId = () =>
  globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;

const CustomerAgent = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || isLoading) {
      return;
    }

    setError(null);
    setIsLoading(true);

    const userMessage: ChatMessage = {
      id: createId(),
      role: "user",
      content: trimmedMessage,
    };

    setMessages((currentMessages) => [...currentMessages, userMessage]);
    setMessage("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: trimmedMessage }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message. Please try again.");
      }

      const data = await response.json();

      if (typeof data?.text !== "string" || !data.text.trim()) {
        throw new Error("We could not generate a reply right now.");
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: createId(),
          role: "assistant",
          content: data.text.trim(),
        },
      ]);
    } catch (requestError) {
      const errorMessage =
        requestError instanceof Error
          ? requestError.message
          : "Failed to send message. Please try again.";

      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full min-h-0 flex-col gap-3">
      {error ? (
        <Alert
          variant="destructive"
          className="border-destructive/20 bg-destructive/10"
        >
          <AlertTitle>Message failed</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}

      <ScrollArea className="flex-1 min-h-0 rounded-2xl border border-border/70 bg-background/95 px-3 py-3 shadow-sm backdrop-blur">
        <div className="flex min-h-full flex-col gap-3">
          {messages.map((chatMessage) => {
            const isUser = chatMessage.role === "user";

            return (
              <div
                key={chatMessage.id}
                className={cn(
                  "flex items-end gap-2",
                  isUser ? "justify-end" : "justify-start",
                )}
              >
                {!isUser ? (
                  <Avatar className="size-8 shrink-0 ring-1 ring-border/70">
                    <AvatarImage src="/logo-mini.png" alt="parcelKoy support" />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      PK
                    </AvatarFallback>
                  </Avatar>
                ) : null}

                <div
                  className={cn(
                    "max-w-[82%] rounded-2xl px-3 py-2 text-sm leading-6 shadow-sm",
                    isUser
                      ? "rounded-br-md bg-primary text-primary-foreground"
                      : "rounded-bl-md border border-border/70 bg-muted text-foreground",
                  )}
                >
                  <p className="whitespace-pre-wrap wrap-break-word">
                    {chatMessage.content}
                  </p>
                </div>

                {isUser ? (
                  <Avatar className="size-8 shrink-0 ring-1 ring-border/70">
                    <AvatarFallback className="bg-secondary text-secondary-foreground">
                      You
                    </AvatarFallback>
                  </Avatar>
                ) : null}
              </div>
            );
          })}

          {isLoading ? (
            <div className="flex items-end gap-2">
              <Avatar className="size-8 shrink-0 ring-1 ring-border/70">
                <AvatarImage src="/logo-mini.png" alt="parcelKoy support" />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  PK
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-border/70 bg-muted px-3 py-2 text-sm text-muted-foreground shadow-sm">
                <Loader2 className="size-4 animate-spin text-primary" />
                <span>parcelKoy support is typing</span>
              </div>
            </div>
          ) : null}

          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-border/70 bg-card p-2 shadow-sm"
      >
        <div className="flex flex-col gap-2">
          <Textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Ask about delivery, tracking, cash on delivery..."
            aria-label="Type your message"
            disabled={isLoading}
            className="min-h-20 rounded-xl bg-background/95 px-4 text-sm placeholder:text-muted-foreground resize-none"
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isLoading || !message.trim()}
              className="h-11 rounded-xl px-4"
            >
              {isLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <SendHorizonal className="size-4" />
              )}
              <span className="hidden sm:inline">Send</span>
            </Button>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
          <Sparkles className="size-3.5 text-secondary" />
          <span>
            We reply with parcelKoy support guidance and service info.
          </span>
        </div>
      </form>
    </div>
  );
};

export default CustomerAgent;
