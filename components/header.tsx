"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleSubmenu = (menu: string) => {
    setActiveSubmenu(activeSubmenu === menu ? null : menu)
  }

  const menuItems = [
    {
      name: "YAZARLAR",
      path: "#",
      submenu: [
        { name: "Köşe Yazarları", path: "#" },
        { name: "Siyasi Yazarlar", path: "#" },
        { name: "Spor Yazarları", path: "#" },
        { name: "Ekonomi Yazarları", path: "#" },
        { name: "Kültür-Sanat Yazarları", path: "#" },
      ],
    },
    {
      name: "GÜNDEM",
      path: "#",
      submenu: [
        { name: "Son Dakika", path: "#" },
        { name: "Türkiye", path: "#" },
        { name: "Dünya", path: "#" },
      ],
    },
    {
      name: "EKONOMİ",
      path: "#",
      submenu: [
        { name: "Piyasalar", path: "#" },
        { name: "Borsa", path: "#" },
        { name: "Döviz", path: "#" },
        { name: "Altın", path: "#" },
        { name: "Kripto Para", path: "#" },
        { name: "Emlak", path: "#" },
      ],
    },
    {
      name: "DÜNYA",
      path: "#",
      submenu: [
        { name: "Avrupa", path: "#" },
        { name: "Amerika", path: "#" },
        { name: "Asya", path: "#" },
        { name: "Afrika", path: "#" },
        { name: "Ortadoğu", path: "#" },
      ],
    },
    {
      name: "SON DAKİKA",
      path: "#",
     
    },
    {
      name: "GÜNÜN İÇİNDEN",
      path: "#",
     
    },
    {
      name: "HAYAT",
      path: "#",
     
    },
    {
      name: "RESMİ İLANLAR",
      path: "#",
     
    },
    {
      name: "SPOR",
      path: "#",
      
    },
    {
      name: "GEÇMİŞ",
      path: "/history",
    },
  ]

  return (
    <header className={`sticky top-0 z-50 w-full ${isScrolled ? "bg-white shadow" : "bg-white"}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-gray-800">
            Haber Portalı
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex space-x-4">
            {menuItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.submenu ? (
                  <div className="flex items-center text-sm font-bold text-gray-800 hover:text-red-600 cursor-pointer">
                    {item.name}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </div>
                ) : (
                  <Link
                    href={item.path}
                    className="text-sm font-bold text-gray-800 hover:text-red-600"
                  >
                    {item.name}
                  </Link>
                )}

                {item.submenu && (
                  <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-2">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.path}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right side: user + mobile menu button */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-gray-700">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-2">
            {menuItems.map((item) => (
              <div key={item.name}>
                <div
                  className="flex justify-between items-center text-sm font-medium py-2"
                  onClick={() => item.submenu && toggleSubmenu(item.name)}
                >
                  <Link href={item.path}>{item.name}</Link>
                  {item.submenu && <ChevronDown className="h-4 w-4" />}
                </div>
                {item.submenu && activeSubmenu === item.name && (
                  <div className="pl-4 space-y-1">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.path}
                        className="block text-sm text-gray-700 py-1 hover:bg-gray-100"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
