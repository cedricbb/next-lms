"use client"

import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/LogoMakr-8korun.png";
import {ThemeToggle} from "@/components/ui/themeToggle";
import {authClient} from "@/lib/auth-client";
import {Button, buttonVariants} from "@/components/ui/button";
import {UserDropdown} from "@/app/(public)/_components/UserDropdown";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList
} from "@/components/ui/navigation-menu";
import {BookOpen, HouseIcon, LayoutDashboardIcon} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";

const navigationItems = [
    {name: "Accueil", href: "/", icon: HouseIcon, active: true},
    {name: "Cours", href: "/courses", icon: BookOpen},
    {name: "Dashboard", href: "/dashboard", icon: LayoutDashboardIcon},
]

export default function Navbar() {

    const {data: session, isPending} = authClient.useSession()

    return (
        <header className=" flex content-center justify-center sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-[backdrop-filter]:bg-background/60">
            <div className="container flex min-h-16 items-center justify-between gap-4 px-4 md:px-6 lg:px-8">
                <div className="flex flex-1 items-center gap-2">
                    {/* Left side */}
                    {/* Mobile menu trigger */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button className="group size-8 md:hidden" variant="ghost" size="icon">
                                <svg className="pointer-events-none" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 12L20 12" className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"/>
                                    <path d="M4 12H20" className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"/>
                                    <path d="M4 12H20" className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"/>
                                </svg>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-36 p-1 md:hidden">
                            <NavigationMenu className="max-w-none *:w-full">
                                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                                    {navigationItems.map((item, index) => {
                                        const Icon = item.icon
                                        return (
                                            <NavigationMenuItem key={index} className="w-full">
                                                <NavigationMenuLink href={item.href} className="flex-row items-center gap-2 py-1.5" active={item.active}>
                                                    <Icon size={16} className="text-muted-foreground/80" aria-hidden="true"/>
                                                    <span>{item.name}</span>
                                                </NavigationMenuLink>
                                            </NavigationMenuItem>
                                        )
                                    })}
                                </NavigationMenuList>
                            </NavigationMenu>
                        </PopoverContent>
                    </Popover>
                    {/* Navigation Menu */}
                    <NavigationMenu className="max-md:hidden">
                        <NavigationMenuList className="gap-2">
                            {navigationItems.map((item, index) => {
                                const Icon = item.icon
                                return (
                                    <NavigationMenuItem key={index}>
                                        <NavigationMenuLink href={item.href} className="flex-row items-center gap-2 py-1.5 font-medium text-foreground hover:text-white">
                                            <Icon size={16} className="text-muted-foreground/80" aria-hidden="true"/>
                                            <span>{item.name}</span>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                )
                            })}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                {/* Middle side: Logo */}
                <div className="flex items-center">
                    <Link href="/" className="flex items-center space-x-2 mr-4">
                        <Image src={Logo} alt="Logo" className="size-9" />
                        <span className="font-bold">CedricLMS.</span>
                    </Link>
                </div>
                {/* Right side: Actions */}
                <div className="flex flex-1 items-center justify-end space-x-4">
                    <ThemeToggle />
                    {isPending ? null : session ? (
                        <UserDropdown name={session.user.name} email={session.user.email} image={session.user.image || ''}/>
                    ): (
                        <>
                        <Link href="/login" className={buttonVariants({variant: "secondary"})}>Se connecter</Link>
                        <Link href="/login" className={buttonVariants()}>Commencer</Link></>
                    )}
                </div>
            </div>
        </header>
    )
}

