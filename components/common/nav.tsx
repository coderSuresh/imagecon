"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const NavBar = () => {

    const pathname = usePathname()

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Privacy Policy", href: "/privacy-policy" }
    ]

    return (
        <>
            <nav className="items-center justify-between p-4 font-medium hidden md:flex">
                <ul className="flex items-center gap-4">
                    {navLinks.map((link) => (
                        <li key={link.name} className="inline-block mr-4">
                            <Link
                                href={link.href}
                                className={`${pathname === link.href ? "text-primary" : ""} md:hover:text-primary transition-colors duration-300`}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <Link href="https://github.com/coderSuresh/imagecon" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full border border-foreground">
                <Image
                    src="/github.svg"
                    alt="GitHub Logo"
                    width={20}
                    height={20}
                    className="inline-block mr-2"
                />
                <span className="sm:text-base text-sm">GitHub</span>
            </Link>
        </>
    )
}

export default NavBar
