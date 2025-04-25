"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LoginDialog } from "@/components/login-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, User, LogOut, Settings, Shield } from "lucide-react";
import { signOut } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/auth-context";
import { auth } from "@/lib/firebase/config";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const { user, logout, loading } = useAuth();
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      await signOut(auth);
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
      if (pathname === "/profile" || pathname.startsWith("/admin")) {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Logout failed",
        description: "There was a problem logging you out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Hotels", href: "/hotels" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // Get the first letter of the email for the avatar fallback
  const getAvatarFallback = () => {
    if (!user?.email) return "G";
    return user.email.charAt(0).toUpperCase();
  };
  return (
    <header className="sticky top-0 z-50 w-full flex justify-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2 md:gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-lg font-medium transition-colors hover:text-primary ${
                      pathname === item.href
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                {mounted && user && (
                  <>
                    <Link
                      href="/profile"
                      className={`text-lg font-medium transition-colors hover:text-primary ${
                        pathname === "/profile"
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      Profile
                    </Link>
                    {user.isAdmin && (
                      <Link
                        href="/admin"
                        className={`text-lg font-medium transition-colors hover:text-primary ${
                          pathname.startsWith("/admin")
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      >
                        Admin
                      </Link>
                    )}
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">Luxurious Beauty</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-medium transition-colors hover:text-primary ${
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          {/* Theme Toggle Button and User/Login */}
            {mounted && <ThemeToggle />}
            {mounted && !loading && (
              user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
  variant="ghost"
  size="icon"
  className="rounded-full"
>
  <Avatar className="h-8 w-8">
    <AvatarImage
      src={user.photoURL || ""}
      alt={user.displayName || "User"}
    />
    <AvatarFallback>{getAvatarFallback()}</AvatarFallback>
  </Avatar>
</Button>
</DropdownMenuTrigger>
<DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    {user.isAdmin && (
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="cursor-pointer">
                          <Shield className="mr-2 h-4 w-4" />
                          <span>Admin Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem asChild>
                      <Link
                        href="/profile?tab=settings"
                        className="cursor-pointer"
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
          ) : (
            <>
              <LoginDialog
                open={loginDialogOpen}
                onOpenChange={setLoginDialogOpen}
              />
              <Button
                variant="outline"
                onClick={() => setLoginDialogOpen(true)}
              >
                Login
              </Button>
            </>
          )
        )}
      </div>
    </div>
  </header>
);
}
