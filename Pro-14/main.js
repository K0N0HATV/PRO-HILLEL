'use strict'

class Student {
    constructor(name, marks) {
        this.name = name
        this.marks = marks
    }

    getAverageMark() {
        return this.getMarksSum() / this.marks.length
    }

    getMarksSum() {
        return this.marks.reduce((acc, rec) => acc + rec)
    }
}

class Group {
    students = []

    addStudent(student) {
        if (this.isStudent(student)) {
            this.students.push(student)
        }
    }

    isStudent(student) {
        return student instanceof Student
    }

    getAverageMark() {
        return this.getAverageMarksSum() / this.students.length
    }

    getAverageMarksSum() {
        return this.students.map(el => el.getAverageMark()).reduce((acc, rec) => acc + rec)
    }
}

const group = new Group()

group.addStudent(new Student('John', [10, 8]))
group.addStudent(new Student('Alex', [10, 9]))
group.addStudent(new Student('Bob', [6, 10,]))
group.addStudent({})

console.log(group.getAverageMark() === (9 + 9.5 + 8) / 3)