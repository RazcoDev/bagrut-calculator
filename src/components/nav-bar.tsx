"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Sun, Moon } from 'lucide-react'

export function NavBar() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <div className="fixed top-0 z-50 w-full" style={{ fontFamily: "'Heebo', sans-serif" }}>
            <div className="relative">
                <div
                    className="absolute inset-0 bg-white/70 dark:bg-black/70 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800"
                    aria-hidden="true"
                />
                <nav className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    {/* Logo */}
                    <div className="flex shrink-0 items-center">
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-gray-900 dark:text-white"
                        >
                            <span className="text-lg font-semibold">Elevate</span>
                        </Link>
                    </div>

                    {/* Update navigation links */}
                    <div className="hidden md:flex md:items-center rtl:space-x-reverse md:space-x-8">

                        {/* Theme toggle */}

                        {[
                            ["בית", "/"],
                            ["בגרויות", "/bagrut"],
                            ["סיכוי קבלה", "/acceptance"],
                        ].map(([name, href]) => (
                            <Link
                                key={name}
                                href={href}
                                className="text-sm text-gray-600 dark:text-gray-300 transition-colors hover:text-gray-900 dark:hover:text-white"
                            >
                                {name}
                            </Link>
                        ))}

                        <div className="">
                            {mounted && (
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                >
                                    {theme === "dark" ? (
                                        <Sun className="h-[1.2rem] w-[1.2rem]" />
                                    ) : (
                                        <Moon className="h-[1.2rem] w-[1.2rem]" />
                                    )}
                                    <span className="sr-only">Toggle theme</span>
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* LinkedIn and Mail buttons */}
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                            asChild
                        >
                            <Link href="https://www.linkedin.com/in/raz-cohen" target="_blank" rel="noopener noreferrer">
                                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                            </Link>
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                            asChild
                        >
                            <Link href="mailto:raz@getclaimify.io">
                                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                                </svg>
                            </Link>
                        </Button>
                    </div>

                </nav>

            </div>
        </div>
    )
}