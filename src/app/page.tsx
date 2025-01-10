"use client"

import {useState} from 'react'
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

function calculateBonus(subject: string, grade: number, units: number): number {
    if (units < 4) return 0;
    if (EXTRA_BONUS_SUBJECTS.includes(subject)) {
        if (units === 5) {
            if (subject === SUBJECTS.math) return 35;
            return 25
        }
        if (units === 4) {
            if (subject === SUBJECTS.math) return 15;
            return 12.5
        }
    }

    return  units === 4 ? 10 : 20;
}

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
    const [average, setAverage] = useState(0)

    const addSubject = () => {
        setAdditionalSubjects([...additionalSubjects, {name: '', grade: '', units: '', bonusGrade: ''}])
    }

    const updateSubject = (index: number, field: string, value: string, isMandatory: boolean) => {
        const updateSubjects = (subjects: Subject[]) => {
            const newSubjects = [...subjects]
            newSubjects[index] = {...newSubjects[index], [field]: value}

            if (field === 'grade' || field === 'units') {
                const grade = Number(newSubjects[index].grade)
                const units = Number(newSubjects[index].units)
                if (grade && units) {
                    const bonus = calculateBonus( newSubjects[index].name, grade, units)
                    const bonusGrade =grade + bonus
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

    const calculateAverage = () => {
        const allSubjects = [...mandatorySubjects, ...additionalSubjects]
        const totalPoints = allSubjects.reduce((sum, subject) => {
            return sum + (Number(subject.bonusGrade) * Number(subject.units))
        }, 0)
        const totalUnits = allSubjects.reduce((sum, subject) => sum + Number(subject.units), 0)
        setAverage(totalPoints / totalUnits)
    }

    const renderSubjectInputs = (subject: Subject, index: number, isMandatory: boolean) => (
        <div key={index} className="flex space-x-4 mb-4">
            <div className="flex-1">
                <Label htmlFor={`subject-${index}`}>מקצוע</Label>
                {isMandatory ? (
                    <Input id={`subject-${index}`} value={subject.name} readOnly/>
                ) : (
                    <Select onValueChange={(value) => updateSubject(index, 'name', value, isMandatory)}>
                        <SelectTrigger>
                            <SelectValue placeholder="בחר מקצוע"/>
                        </SelectTrigger>
                        <SelectContent>
                            {Object.entries(SUBJECTS).map(([key, value]) => (
                                <SelectItem key={key} value={value}>
                                    {value}
                                </SelectItem>
                            ))}

                        </SelectContent>
                    </Select>
                )}
            </div>
            <div className="w-20">
                <Label htmlFor={`grade-${index}`}>ציון</Label>
                <Input
                    id={`grade-${index}`}
                    value={subject.grade}
                    onChange={(e) => updateSubject(index, 'grade', e.target.value, isMandatory)}
                    placeholder="ציון"
                    type="number"
                />
            </div>
            <div className="w-20">
                <Label htmlFor={`units-${index}`}>יחידות</Label>
                <Input
                    id={`units-${index}`}
                    value={subject.units}
                    onChange={(e) => updateSubject(index, 'units', e.target.value, isMandatory)}
                    placeholder="יחידות"
                    type="number"
                />
            </div>
            <div className="w-24">
                <Label htmlFor={`bonus-grade-${index}`}>ציון עם בונוס</Label>
                <Input
                    id={`bonus-grade-${index}`}
                    value={subject.bonusGrade}
                    readOnly
                    placeholder="ציון עם בונוס"
                />
            </div>
        </div>
    )

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>מחשבון בגרויות</CardTitle>
                <CardDescription>הזן את הציונים והיחידות לכל מקצוע</CardDescription>
            </CardHeader>
            <CardContent>
                <h3 className="text-lg font-semibold mb-2">מקצועות חובה</h3>
                {mandatorySubjects.map((subject, index) => renderSubjectInputs(subject, index, true))}

                <h3 className="text-lg font-semibold mt-6 mb-2">מקצועות נוספים</h3>
                {additionalSubjects.map((subject, index) => renderSubjectInputs(subject, index, false))}

                <Button onClick={addSubject} className="mt-2">הוסף מקצוע</Button>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button onClick={calculateAverage}>חשב ממוצע</Button>
                <div>ממוצע: {average.toFixed(2)}</div>
            </CardFooter>
        </Card>
    )
}

