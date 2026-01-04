"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import {
    Home,
    Trophy,
    User,
    Settings,
    Store,
    MoreHorizontal,
    BookOpen,
    Shield
} from "lucide-react";

type SidebarItem = {
    label: string;
    href: string;
    icon: React.ReactNode;
};

export const Sidebar = ({ className }: { className?: string }) => {
    const pathname = usePathname();
    const { user } = useAuth();

    const sidebarItems: SidebarItem[] = [
        {
            label: "Learn",
            href: "/learn",
            icon: <Home className="w-7 h-7" strokeWidth={2.5} />
        },
        {
            label: "Letters",
            href: "/letters",
            icon: <span className="font-extrabold text-xl w-7 text-center">あ</span>
        },
        {
            label: "Leaderboards",
            href: "/leaderboard",
            icon: <Shield className="w-7 h-7" strokeWidth={2.5} />
        },
        {
            label: "Quests",
            href: "/quests",
            icon: <Trophy className="w-7 h-7" strokeWidth={2.5} />
        },
        {
            label: "Shop",
            href: "/shop",
            icon: <Store className="w-7 h-7" strokeWidth={2.5} />
        },
        {
            label: "Profile",
            href: "/profile",
            icon: <User className="w-7 h-7" strokeWidth={2.5} />
        },
        {
            label: "More",
            href: "/more",
            icon: <MoreHorizontal className="w-7 h-7" strokeWidth={2.5} />
        },
    ];

    return (
        <div className={cn(
            "flex h-full w-[256px] flex-col border-r-2 border-[#e5e5e5] bg-white px-4 py-6 dark:bg-[#131f24] dark:border-[#37464f] fixed left-0 top-0 hidden lg:flex",
            className
        )}>
            <Link href="/learn" className="mb-8 pl-4 pt-2">
                <h1 className="text-3xl font-extrabold tracking-tighter text-[#58cc02]">
                    CodeLingo
                </h1>
            </Link>

            <div className="flex flex-1 flex-col gap-2">
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                    return (
                        <Link key={item.href} href={item.href}>
                            <div
                                className={cn(
                                    "flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-widest transition-colors",
                                    isActive
                                        ? "border-2 border-[#84d8ff] bg-[#ddf4ff] text-[#1cb0f6] dark:bg-[#1a3a4a] dark:border-[#37464f] dark:text-[#84d8ff]"
                                        : "border-2 border-transparent text-[#777777] hover:bg-[#f7f7f7] hover:text-[#3c3c3c] dark:text-[#afafaf] dark:hover:bg-[#1a2c35] dark:hover:text-white"
                                )}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Optional: Add user profile summary or auth logic here if needed */}
        </div>
    );
};
