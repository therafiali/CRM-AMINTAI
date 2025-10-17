import * as React from "react";
import { cn } from "@/lib/utils";

export function Sidebar({ 
  className, 
  children 
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <aside className={cn("h-full w-60 border-r bg-white", className)}>
      {children}
    </aside>
  );
}

export function SidebarHeader({ 
  className, 
  children 
}: React.PropsWithChildren<{ className?: string }>) {
  return <div className={cn("px-4 py-3 border-b", className)}>{children}</div>;
}

export function SidebarNav({ 
  className, 
  children 
}: React.PropsWithChildren<{ className?: string }>) {
  return <nav className={cn("p-2 space-y-1", className)}>{children}</nav>;
}