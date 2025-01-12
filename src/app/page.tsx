import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function HomePage() {
    return (
        <div className="min-h-screen bg-black text-white text-center font-sans" style={{ fontFamily: "'Heebo', sans-serif" }}>
            <main className="container mx-auto px-4 py-24">
                <h1 className="text-4xl font-bold mb-8">ברוך הבא ל-Elevate</h1>
                <div className="grid md:grid-cols-2 gap-8 mb-16">
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

                <Card className="bg-gray-900 border-gray-800 max-w-2xl mx-auto ">
                    <CardHeader>
                        <CardTitle className="text-2xl text-white">היי ! 👋</CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-between text-right items-right rtl:space-x-reverse space-x-6 ">
                        {/*<div className="w-32 h-32 rounded-full bg-gray-700 flex-shrink-0 overflow-hidden">*/}
                        {/*     Replace the div below with an Image component when you have the actual image */}
                        {/*    <div className="w-full h-full bg-gray-600 flex items-center justify-center text-gray-400">*/}
                        {/*        Photo*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <div >
                            <h2 className="text-xl font-semibold mb-2 "></h2>
                            <p className="text-gray-300 mb-4">Raz Cohen,יזם ו-Head of Platform @ Permit.io  ☺️</p>
                            <p className="text-gray-300">
                                אם יש לכם עוד בקשה או צורך, תפנו אלי בלינקדאין או מייל.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}

