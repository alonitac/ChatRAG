"use client";

import Link from "next/link";
import { MessageSquare, Plus } from "lucide-react";
import type { Session } from "@/lib/ragflow";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export function AppShell({
  sessions,
  sessionId,
  children,
}: {
  sessions: Session[];
  sessionId?: string;
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="h-dvh max-h-dvh overflow-hidden">
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="New chat">
                <Link href="/">
                  <Plus />
                  <span>New chat</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Chats</SidebarGroupLabel>
            <SidebarGroupContent>
              {sessions.length === 0 ? (
                <p className="px-2 text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">
                  No chats yet
                </p>
              ) : (
                <SidebarMenu>
                  {sessions.map((session) => (
                    <SidebarMenuItem key={session.id}>
                      <SidebarMenuButton
                        asChild
                        isActive={session.id === sessionId}
                        tooltip={session.name}
                      >
                        <Link href={`/?session=${session.id}`}>
                          <MessageSquare />
                          <span>{session.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              )}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset className="min-h-0 overflow-hidden">
        <header className="flex h-12 shrink-0 items-center gap-2 border-b px-3">
          <SidebarTrigger />
          <Separator orientation="vertical" />
          <span className="text-sm font-medium">ChatRAG</span>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
