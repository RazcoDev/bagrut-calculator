import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import {NavBar} from "@/components/nav-bar";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Elevate - Bagrut and Acceptance Calculator',
    description: 'Calculate your Bagrut average and university acceptance chances',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" dir="rtl" suppressHydrationWarning>
        <head>
            <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;700&display=swap" rel="stylesheet" />
        </head>
        <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <NavBar/>
            {children}
        </ThemeProvider>
        </body>
        </html>
    )
}

