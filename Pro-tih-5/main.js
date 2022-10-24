const students = [
    {
        id: 10,
        name: 'John Smith',
        marks: [10, 8, 6, 9, 8, 7]
    },
    {
        id: 11,
        name: 'John Doe',
        marks: [9, 8, 7, 6, 7]
    },
    {
        id: 12,
        name: 'Thomas Anderson',
        marks: [6, 7, 10, 8]
    },
    {
        id: 13,
        name: 'Jean-Baptiste Emanuel Zorg',
        marks: [10, 9, 8, 9]
    }
]
const avgStudent = averageStudentMark(10)
const avgGroup = averageGroupMark(students)

console.log(avgStudent)
console.log(avgGroup)

function averageStudentMark(id) {
    str = students.find(students => students.id === id)
    studentsMarksLength = str.marks.length
    return div = str.marks.reduce((acc, mac) => acc + mac) / studentsMarksLength
}

function averageGroupMark(students) {
    let avgGroup
    avgMass = []
    lengthStudents = students.length
    for (i = 0; i < lengthStudents; i++) {
        plusGroup = students[i].marks
        lengthStudentsMarks = plusGroup.length
        for (q = 0; q < lengthStudentsMarks; q++) {
            plusGroupMarks = plusGroup[q]
            avgMass.push(plusGroupMarks)
        }
    }
    avgMassLength = avgMass.length
    avgGroup = avgMass.reduce((acc, rec) => acc + rec) / avgMassLength
    return avgGroup
}