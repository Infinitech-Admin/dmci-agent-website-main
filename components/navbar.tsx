"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
  Button,
  Divider,
} from "@heroui/react";

import NextLink from "next/link";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { BrandLogo } from "@/components/icons";
import FormUtilities from "./navbar/formsutilities";
import { LuDownload } from "react-icons/lu";

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);

  // PWA INSTALL STATE
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    const handleAppInstalled = () => {
      setShowInstallButton(false);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );

      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallApp = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setShowInstallButton(false);
    }

    setDeferredPrompt(null);
  };

  const handleLinkClick = (href: string) => {
    setMenuOpen(false);
    router.push(href);
  };

  return (
    <>
      <NextUINavbar
        className="bg-blue-800 text-white xl:px-12"
        isMenuOpen={menuOpen}
        maxWidth="full"
        onMenuOpenChange={setMenuOpen}
      >
        {/* Brand */}
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3">
            <NextLink
              className="flex items-center justify-between gap-1"
              href="/"
            >
              <BrandLogo />

              <p className="font-bold text-2xl">DMCI HOMES</p>
            </NextLink>
          </NavbarBrand>
        </NavbarContent>

        {/* Desktop Navigation */}
        <NavbarContent className="hidden xl:flex" justify="center">
          <NavbarItem>
            <ul className="hidden lg:flex gap-6">
              {siteConfig.navItems.map((item) => (
                <NavbarItem key={item.href}>
                  <NextLink
                    className={clsx(
                      "w-full text-left uppercase",
                      pathname === item.href && "text-green-500 font-bold",
                    )}
                    href={item.href}
                  >
                    {item.label}
                  </NextLink>
                </NavbarItem>
              ))}
            </ul>
          </NavbarItem>
        </NavbarContent>

        {/* Desktop Right Section */}
        <NavbarContent
          className="hidden xl:flex basis-1/5 sm:basis-full"
          justify="end"
        >
          <NavbarItem className="flex items-center gap-3">
            {/* Customer Reservation Form */}
            <FormUtilities />

            {/* Install App */}
            {showInstallButton && (
              <Button
                onPress={handleInstallApp}
                isIconOnly
                className="bg-green-600 text-white rounded-full p-2 hover:bg-green-700"
                aria-label="Install App"
              >
                <LuDownload size={20} />
              </Button>
            )}

            {/* Theme Switch */}
            <ThemeSwitch />
          </NavbarItem>
        </NavbarContent>

        {/* Mobile Navbar */}
        <NavbarContent className="xl:hidden basis-1 pl-4" justify="end">
          <ThemeSwitch />

          <NavbarMenuToggle />
        </NavbarContent>

        {/* Mobile Menu */}
        <NavbarMenu>
          <div className="mt-2 flex flex-col gap-2">
            {/* Main Navigation */}
            {siteConfig.navMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item.href}-${index}`}>
                <button
                  type="button"
                  className={clsx(
                    "w-full text-left",
                    pathname === item.href && "text-blue-500 font-bold",
                  )}
                  onClick={() => handleLinkClick(item.href)}
                >
                  {item.label}
                </button>
              </NavbarMenuItem>
            ))}

            <Divider className="my-4" />

            {/* Form & Utilities */}
            <div className="space-y-1">
              <p className="text-small text-default-400">Form & Utilities</p>
            </div>

            {siteConfig.navMenuItemsLinks.map((item, index) => (
              <NavbarMenuItem key={`${item.href}-${index}`}>
                {item.download ? (
                  <a
                    href={item.href}
                    download
                    className={clsx(
                      "w-full text-left block",
                      pathname === item.href && "text-blue-500 font-bold",
                    )}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <button
                    type="button"
                    className={clsx(
                      "w-full text-left",
                      pathname === item.href && "text-blue-500 font-bold",
                    )}
                    onClick={() => handleLinkClick(item.href)}
                  >
                    {item.label}
                  </button>
                )}
              </NavbarMenuItem>
            ))}

            {/* Install App */}
            {showInstallButton && (
              <NavbarMenuItem>
                <button
                  type="button"
                  className="w-full text-left cursor-pointer text-green-600 font-medium"
                  onClick={() => {
                    handleInstallApp();
                    setMenuOpen(false);
                  }}
                >
                  Install App
                </button>
              </NavbarMenuItem>
            )}
          </div>
        </NavbarMenu>
      </NextUINavbar>
    </>
  );
};
