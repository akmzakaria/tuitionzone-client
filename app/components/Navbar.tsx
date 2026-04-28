"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

type Role = "guardian" | "tutor" | "admin";

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const role = session?.user?.role as Role | undefined;

  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    setIsMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  //  PUBLIC NAV
  const publicNav = [
    { name: "Tutions", href: "/tutions" },
    { name: "Tutors", href: "/tutors" },
    { name: "Contact", href: "/contact" },
    { name: "About", href: "/aboutUs" },
  ];

  //  ROLE-BASED DASHBOARD LINK
  const getDashboardLink = () => {
    switch (role) {
      case "tutor":
        return "/dashboard/tutor";
      case "guardian":
        return "/dashboard/guardian";
      case "admin":
        return "/dashboard/admin";
      default:
        return "/dashboard";
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#1B263B]/90 backdrop-blur border-b border-[#F4D35E]">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* LEFT: LOGO */}
        {/* <Link href="/" className="text-[#F4D35E] font-bold text-xl">
          TuitionZone
        </Link> */}
        <Link href={"/"}>
          <img
            src="/tuitionzonebd2_bg-removed_edited.png"
            className="w-35"
            alt=""
          />
        </Link>

        {/* CENTER: NAV */}
        <div className="hidden md:flex gap-8 text-white font-medium">
          {publicNav.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`transition ${
                isActive(item.href) ? "text-[#F4D35E]" : "hover:text-[#F4D35E]"
              }`}
            >
              {item.name}
            </Link>
          ))}

          {/* Dashboard (only logged in) */}
          {session && (
            <Link
              href={getDashboardLink()}
              className={`transition ${
                isActive("/dashboard")
                  ? "text-[#F4D35E]"
                  : "hover:text-[#F4D35E]"
              }`}
            >
              Dashboard
            </Link>
          )}
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          {/* AUTH */}
          {status === "loading" ? (
            <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse" />
          ) : session?.user ? (
            <div className="relative">
              {/* Avatar */}
              <button onClick={() => setDropdownOpen(!dropdownOpen)}>
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    className="w-9 h-9 rounded-full border-2 border-[#F4D35E]"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-[#415A77] text-white flex items-center justify-center">
                    {session.user.name?.[0] || "U"}
                  </div>
                )}
              </button>

              {/* DROPDOWN */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="px-4 py-2 text-sm text-gray-500 border-b">
                    {session.user.email}
                  </div>

                  <Link
                    href={getDashboardLink()}
                    className="block px-4 py-2 hover:bg-gray-50"
                  >
                    Dashboard
                  </Link>

                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-50"
                  >
                    Profile
                  </Link>

                  <button
                    onClick={() => signOut()}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-red-500"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 bg-[#415A77] text-white rounded-lg border border-[#F4D35E] hover:bg-[#F4D35E] hover:text-[#1B263B]"
            >
              Login
            </Link>
          )}

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden transition-all duration-300 ${
          isMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-5 pointer-events-none"
        }`}
      >
        <div className="bg-[#1B263B] px-6 py-4 space-y-3 text-white">
          {publicNav.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block hover:text-[#F4D35E]"
            >
              {item.name}
            </Link>
          ))}

          {session && (
            <Link
              href={getDashboardLink()}
              className="block hover:text-[#F4D35E]"
            >
              Dashboard
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
