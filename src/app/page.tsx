import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import * as React from "react";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-black text-white text-center font-sans" style={{ fontFamily: "'Heebo', sans-serif" }}>
            <main className="container mx-auto px-4 py-24">
                <h1 className="text-4xl font-bold mb-8">ברוך הבא ל-Elevate</h1>
                <div className="grid ">


                    <video autoPlay loop muted
                           width="640" className="justify-self-center rounded-md" >
                    <source
                        src="https://raw.githubusercontent.com/RazcoDev/bagrut-calculator/main/assets/home.mp4"
                        type="video/mp4"
                    />
                </video>
                </div>
                <div className="grid md:grid-cols-2 gap-8 mb-16 ">
                    <Card className="bg-gray-900 border-gray-800 text-center">
                        <CardHeader>
                            <CardTitle className="text-xl text-white">מחשבון ממוצע בגרות</CardTitle>
                            <CardDescription className="text-gray-400">תהית לעצמך מה ממוצע הבגרות שלך ?</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4 text-gray-300">חשבו את ממוצע הבגרויות שלכן/ם - מלאו את ציון מקצועות החובה והבחירה. </p>
                            <Button asChild className="text-white bg-blue-600 hover:bg-blue-700">
                                <Link href="/bagrut">מחשבון ממוצע</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-900 border-gray-800">
                        <CardHeader>
                            <CardTitle className="text-xl text-white">מחשבון סיכוי קבלה</CardTitle>
                            <CardDescription className="text-gray-400">רוצה לדעת את סיכוי הקבלה לפקולטה ?</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4 text-gray-300">מאוד פשוט - מלא את ממוצע הבגרויות וציון הפסיכומטרי שלך !</p>
                            <Button asChild className="text-white bg-blue-600 hover:bg-blue-700">
                                <Link href="/acceptance">מחשבון קבלה</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <Card className="bg-gray-900 border-gray-800 max-w-2xl mx-auto  ">
                    <CardHeader>
                        <CardTitle className="text-2xl text-white">היי ! 👋</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/*<div className="w-32 h-32 rounded-full bg-gray-700 flex-shrink-0 overflow-hidden">*/}
                        {/*     Replace the div below with an Image component when you have the actual image */}
                        {/*    <div className="w-full h-full bg-gray-600 flex items-center justify-center text-gray-400">*/}
                        {/*        Photo*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <div >
                            <h2 className="text-xl font-semibold mb-2 "></h2>
                            <p className="text-gray-300 mb-4">רז כהן, יזם ו-Head of Platform @ Permit.io  ☺️</p>
                            <p className="text-gray-300">
                                אם יש לכם עוד בקשה או צורך, תפנו אלי בלינקדאין או מייל.
                            </p>
                        </div>
                        <div className="mt-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-300 hover:text-white"
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
                                className="text-gray-300 hover:text-white"
                                asChild
                            >
                                <Link href="mailto:raz@getclaimify.io">
                                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                                    </svg>
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}

