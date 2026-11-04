import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

export default function Loading() {
  return (
    <SidebarProvider className="h-dvh max-h-dvh overflow-hidden">
      <Sidebar collapsible="none">
        <SidebarHeader>
          <Skeleton className="h-8 w-full" />
        </SidebarHeader>
        <SidebarContent className="gap-2 px-2">
          {Array.from({ length: 6 }, (_, i) => (
            <Skeleton key={i} className="h-8 w-full" />
          ))}
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="min-h-0 overflow-hidden">
        <header className="flex h-12 shrink-0 items-center gap-2 border-b px-3">
          <Skeleton className="size-7" />
          <Separator orientation="vertical" />
          <Skeleton className="h-4 w-24" />
        </header>
        <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 p-6">
          <Skeleton className="h-16 w-2/3" />
          <Skeleton className="ml-auto h-16 w-1/2" />
          <Skeleton className="h-16 w-3/5" />
        </div>
        <div className="mx-auto flex w-full max-w-3xl gap-2 border-t p-4">
          <Skeleton className="h-9 flex-1" />
          <Skeleton className="h-8 w-20" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
