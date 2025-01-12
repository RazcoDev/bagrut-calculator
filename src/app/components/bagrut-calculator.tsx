"use client"

import {useState, useCallback, useEffect} from 'react'
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter} from "@/components/ui/card"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"

const SUBJECTS: { [key: string]: string } = {
    bible: "תנ״ך",
    history: "היסטוריה",
    civics: "אזרחות",
    literature: "ספרות",
    english: "אנגלית",
    math: "מתמטיקה",
    hebrew: "לשון",
    physics: "פיזיקה",
    chemistry: "כימיה",
    biology: "ביולוגיה",
    computer: "מדעי המחשב",
    arabic: "ערבית",
    french: "צרפתית",
    talmud: "תלמוד",
    tushba: "תושב״ע",
    israel: "מחשבת ישראל",
}

const MANDATORY_SUBJECTS = [SUBJECTS.bible, SUBJECTS.history,SUBJECTS.arabic, SUBJECTS.civics, SUBJECTS.literature, SUBJECTS.english, SUBJECTS.math, SUBJECTS.hebrew, SUBJECTS.israel, ]
const EXTRA_BONUS_SUBJECTS = [SUBJECTS.bible, SUBJECTS.israel, SUBJECTS.tushba, SUBJECTS.talmud, SUBJECTS.history, SUBJECTS.civics, SUBJECTS.literature, SUBJECTS.chemistry, SUBJECTS.physics, SUBJECTS.math, SUBJECTS.biology, SUBJECTS.computer, SUBJECTS.english]

const EMOJIS = ['😊', '🎓', '📚', '🧠', '💡', '🔥', '🌟', '🚀', '💪', '🏆']

function calculateBonus(subject: string, grade: number, units: number): number {
    console.log('subject name:' ,subject)
    if (units < 4) return 0;
    if (EXTRA_BONUS_SUBJECTS.includes(subject)) {
        if (units === 5) {
            console.log('special subject')
            if (subject === SUBJECTS.math) return 35;
            return 25
        }
        if (units === 4) {
            if (subject === SUBJECTS.math) return 15;
            return 12.5
        }
    }
    console.log('regular subject')

    return  units === 4 ? 10 : 20;
}

const getRandomEmoji = () => EMOJIS[Math.floor(Math.random() * EMOJIS.length)]

type Subject = {
    name: string;
    grade: string;
    units: string;
    bonusGrade: string;
}

export default function BagrutCalculator() {
    const [mandatorySubjects, setMandatorySubjects] = useState<Subject[]>(
        MANDATORY_SUBJECTS.map(subject => ({name: subject, grade: '', units: '', bonusGrade: ''}))
    )
    const [additionalSubjects, setAdditionalSubjects] = useState<Subject[]>([])
    const [average, setAverage] = useState({ value: 0, emoji: EMOJIS[0] })

    const addSubject = () => {
        setAdditionalSubjects([...additionalSubjects, {name: '', grade: '', units: '', bonusGrade: ''}])
    }


    const updateSubject = (index: number, field: string, value: string, isMandatory: boolean) => {
        const updateSubjects = (subjects: Subject[]) => {
            const newSubjects = [...subjects]
            newSubjects[index] = {...newSubjects[index], [field]: value}

            if (field === 'grade' || field === 'units' || field === 'name') {
                const grade = Number(newSubjects[index].grade)
                const units = Number(newSubjects[index].units)
                if (grade && units) {
                    const bonus = calculateBonus(subjects[index].name, grade, units)
                    const bonusGrade = grade + bonus
                    newSubjects[index].bonusGrade = bonusGrade.toFixed(1)
                }
            }

            return newSubjects
        }

        if (isMandatory) {
            setMandatorySubjects(updateSubjects(mandatorySubjects))
        } else {
            setAdditionalSubjects(updateSubjects(additionalSubjects))
        }
    }

    const calculateAverage = useCallback(() => {
        const allSubjects = [...mandatorySubjects, ...additionalSubjects]
        const totalPoints = allSubjects.reduce((sum, subject) => {
            return sum + (Number(subject.bonusGrade) * Number(subject.units))
        }, 0)
        const totalUnits = allSubjects.reduce((sum, subject) => sum + Number(subject.units), 0)
        const newAverage = totalPoints / totalUnits
        setAverage({ value: newAverage, emoji: getRandomEmoji() })
    }, [mandatorySubjects, additionalSubjects])

    useEffect(() => {
        calculateAverage()
    }, [mandatorySubjects, additionalSubjects, calculateAverage])

    const renderSubjectInputs = (subject: Subject, index: number, isMandatory: boolean) => (

        <div key={index} className="flex space-x-2 mb-2 direction-right">
            <div className="flex-1 rtl:ml-2">
                <Label htmlFor={`subject-${index}`} className="text-gray-300">מקצוע</Label>
                {isMandatory ? (
                    <Input id={`subject-${index}`} value={subject.name} readOnly className="text-right bg-gray-800 text-white border-gray-700"/>
                ) : (
                    <Select onValueChange={(value) => updateSubject(index, 'name', value, isMandatory)}>
                        <SelectTrigger className="bg-gray-800 text-white border-gray-700">
                            <SelectValue placeholder="בחר מקצוע"/>
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 text-white border-gray-700">
                            {Object.entries(SUBJECTS).map(([key, value]) => (
                                <SelectItem key={key} value={value} className="hover:bg-gray-700">
                                    {value}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            </div>

            <div className="w-24 ">
                <Label htmlFor={`grade-${index}`} className="text-gray-300">ציון</Label>
                <Input
                    id={`grade-${index}`}
                    value={subject.grade}
                    onChange={(e) => updateSubject(index, 'grade', e.target.value, isMandatory)}
                    placeholder="ציון"
                    type="number"
                    className="bg-gray-800 text-white border-gray-700"
                />
            </div>
            <div className="w-24">
                <Label htmlFor={`units-${index}`} className="text-gray-300">יחידות</Label>
                <Input
                    id={`units-${index}`}
                    value={subject.units}
                    onChange={(e) => updateSubject(index, 'units', e.target.value, isMandatory)}
                    placeholder="יחידות"
                    type="number"
                    className="bg-gray-800 text-white border-gray-700"
                />
            </div>

            <div className="w-28">
                <Label htmlFor={`bonus-grade-${index}`} className="text-gray-300">ציון עם בונוס</Label>
                <Input
                    id={`bonus-grade-${index}`}
                    value={subject.bonusGrade}
                    readOnly
                    placeholder="ציון עם בונוס"
                    className="text-right bg-gray-800 text-white border-gray-700"
                />
            </div>

        </div>
    )

    return (
        <div className="min-h-screen bg-black dark font-sans " style={{ fontFamily: "'Heebo', sans-serif" }}>
            <main className="pt-24 px-4">
                <Card className="w-full max-w-2xl mx-auto border-gray-800 bg-gray-900/50 backdrop-blur-xl">
                    <CardHeader>
                        <CardTitle className="text-white text-2xl ">מחשבון בגרויות</CardTitle>
                        <CardDescription className="text-gray-400">הזן את הציונים והיחידות לכל מקצוע</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <h3 className="text-lg font-semibold mb-2 text-white">מקצועות חובה</h3>
                        {mandatorySubjects.map((subject, index) => renderSubjectInputs(subject, index, true))}

                        <h3 className="text-lg font-semibold mt-6 mb-2 text-white">מקצועות בחירה</h3>
                        {additionalSubjects.map((subject, index) => renderSubjectInputs(subject, index, false))}

                        <Button onClick={addSubject} className="mt-2 bg-gray-800 hover:bg-gray-700 text-white">הוסף מקצוע</Button>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <div className="text-white text-lg">{average.emoji} ממוצע: { average.value > 0 ? average.value.toFixed(1) : 0 } </div>
                        <Button className="bg-gray-800 hover:bg-gray-700 text-white">חשב ממוצע</Button>
                    </CardFooter>
                </Card>
            </main>
        </div>
    )
}

