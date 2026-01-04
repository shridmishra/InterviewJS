"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Sidebar } from "./Sidebar"; // Reuse the sidebar content inside the sheet

export const MobileHeader = () => {
    return (
        <nav className="fixed top-0 z-50 flex h-[68px] w-full items-center justify-between border-b-2 border-[#e5e5e5] bg-white px-4 dark:bg-[#131f24] dark:border-[#37464f] lg:hidden">
            <Link href="/learn">
                <h1 className="text-2xl font-extrabold tracking-tighter text-[#58cc02]">
                    CodeLingo
                </h1>
            </Link>

            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="h-6 w-6 text-[#777777]" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 border-r-0 w-[256px]">
                    <Sidebar className="flex w-full border-r-0 relative" />
                </SheetContent>
            </Sheet>
        </nav>
    );
};
