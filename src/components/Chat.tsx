"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Bot, Send, User } from "lucide-react";
import type { Message } from "@/lib/ragflow";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export function Chat({ sessionId, history }: { sessionId?: string; history: Message[] }) {
  const router = useRouter();
  const [messages, setMessages] = useState(history);
  const [question, setQuestion] = useState("");
  const [waiting, setWaiting] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages, waiting]);

  async function send(event: React.FormEvent) {
    event.preventDefault();
    if (!question || waiting) return;

    setMessages([...messages, { role: "user", content: question }]);
    setQuestion("");
    setWaiting(true);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, sessionId }),
    });
    const data = await response.json();

    setMessages((current) => [...current, { role: "assistant", content: data.answer }]);
    setWaiting(false);
    // A new chat got a session: move to its URL, so it shows up in the list.
    if (!sessionId) router.push(`/?session=${data.sessionId}`);
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {messages.length === 0 && !waiting ? (
        <div className="flex flex-1 items-center justify-center p-6">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Ask a question</CardTitle>
              <CardDescription>
                Start a chat. Your question is sent to the RAGFlow assistant.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      ) : (
        <ScrollArea className="h-0 min-h-0 flex-1">
          <div className="mx-auto flex max-w-3xl flex-col gap-4 p-6">
            {messages.map((message, i) => {
              const isUser = message.role === "user";
              return (
                <div key={i} className={cn("flex items-start gap-3", isUser && "flex-row-reverse")}>
                  <Avatar>
                    <AvatarFallback>{isUser ? <User /> : <Bot />}</AvatarFallback>
                  </Avatar>
                  <Card
                    size="sm"
                    className={cn(
                      "max-w-2xl",
                      isUser && "bg-primary text-primary-foreground ring-primary",
                    )}
                  >
                    <CardContent className="whitespace-pre-wrap">{message.content}</CardContent>
                  </Card>
                </div>
              );
            })}
            {waiting && (
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>
                    <Bot />
                  </AvatarFallback>
                </Avatar>
                <Badge variant="secondary">Thinking...</Badge>
              </div>
            )}
            <div ref={endRef} />
          </div>
        </ScrollArea>
      )}

      <form onSubmit={send} className="mx-auto flex w-full max-w-3xl shrink-0 gap-2 border-t p-4">
        <Input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question..."
          aria-label="Question"
          className="h-9"
        />
        <Button type="submit" disabled={!question || waiting}>
          <Send />
          Send
        </Button>
      </form>
    </div>
  );
}
