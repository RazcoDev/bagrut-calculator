"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import studyData from "@/data/data.json";

// This would typically be fetched from an API or loaded dynamically

function calculateAcceptanceChance(avgBagrut: number, avgPshy: number, studyType: string): number {
    const study = studyData.find(s => s.studyType === studyType)
    if (!study) return 0

    const requiredAvgBagrut = parseInt(study.avgBagrut)
    const requiredAvgPshy = parseInt(study.avgPshy)

    // Convert Bagrut score to psychometry scale (assuming 1:1 conversion for simplicity)
    const convertedBagrutToPshy = avgBagrut

    // Calculate the acceptance score
    const acceptanceScore = (convertedBagrutToPshy + avgPshy) / 2
    const requiredScore = (requiredAvgBagrut + requiredAvgPshy) / 2

    // Calculate the percentage
    let acceptanceChance = (acceptanceScore / requiredScore) * 100

    // Ensure percentage does not exceed 100%
    acceptanceChance = Math.min(acceptanceChance, 100)

    return Math.round(acceptanceChance * 100) / 100
}

export default function AcceptanceCalculator() {
    const [avgBagrut, setAvgBagrut] = useState('')
    const [avgPshy, setAvgPshy] = useState('')
    const [studyType, setStudyType] = useState('')
    const [acceptanceChanceString, setAcceptanceChanceString] = useState<string | null>(null)

    function acceptanceChanceToString(chance: number) {
        //     98%-99% סיכוי גבוה מאוד
        // 90%-97% סיכוי גבוה
        // 85%-89% סיכוי בינוני
        // 85% ומטה סיכוי נמוך
        if (chance >= 98) return "סיכויים גבוהים מאוד"
        if (chance >= 90) return "סיכויים גבוהים"
        if (chance >= 85) return "סיכויים בינוניים"
        return "סיכויים נמוכים"
    }

    const handleCalculate = () => {
        if (avgBagrut && avgPshy && studyType) {
            const chance = calculateAcceptanceChance(Number(avgBagrut), Number(avgPshy), studyType)
            const chanceString = acceptanceChanceToString(chance)
            setAcceptanceChanceString(chanceString)
        }
    }

    return (
        <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-sans" style={{ fontFamily: "'Heebo', sans-serif" }}>
            <main className="pt-24 px-4">
                <Card className="w-full max-w-2xl mx-auto border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900/50 backdrop-blur-xl">
                    <CardHeader>
                        <CardTitle className="text-gray-900 dark:text-white text-2xl">מחשבון סיכויי קבלה</CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-400">הזן את הנתונים שלך לחישוב סיכויי הקבלה</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="avg-bagrut" className="text-gray-700 dark:text-gray-300">ממוצע בגרות</Label>
                                <Input
                                    id="avg-bagrut"
                                    type="number"
                                    value={avgBagrut}
                                    onChange={(e) => setAvgBagrut(e.target.value)}
                                    className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
                                />
                            </div>
                            <div>
                                <Label htmlFor="avg-pshy" className="text-gray-700 dark:text-gray-300">ציון פסיכומטרי</Label>
                                <Input
                                    id="avg-pshy"
                                    type="number"
                                    value={avgPshy}
                                    onChange={(e) => setAvgPshy(e.target.value)}
                                    className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
                                />
                            </div>
                            <div>
                                <Label htmlFor="study-type" className="text-gray-700 dark:text-gray-300">תחום לימודים</Label>
                                <Select onValueChange={setStudyType}>
                                    <SelectTrigger id="study-type" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700">
                                        <SelectValue placeholder="בחר תחום לימודים" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700">
                                        {studyData.map((study) => (
                                            <SelectItem key={study.studyType} value={study.studyType} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                                {study.studyType}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button onClick={handleCalculate} className="bg-blue-600 hover:bg-blue-700 text-white">
                            חשב סיכויי קבלה
                        </Button>
                        {acceptanceChanceString !== null && (
                            <div className="dark:text-white text text-lg">
                                סיכויי הקבלה: {acceptanceChanceString}
                            </div>
                        )}
                    </CardFooter>
                </Card>
            </main>
        </div>
    )
}

