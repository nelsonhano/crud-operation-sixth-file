const { redirect } = require("express/lib/response");
const Plan = require("../models/Plan")
const PlanStudent = require("../models/PlanStudent")
const Student = require("../models/Student")
const uuid = require('../helpers/uuid');
const { validationResult } = require("express-validator");

let addStudent = async (req, res) => {
    let plans = await Plan.fetch();
    res.render('add-student', { plans })
}
let postStudent = async (req, res) => {               
    let { confirm_password, plan_id, ...otherFields } = req.body
    let student = new Student(otherFields)
    if (req.files.passport != undefined) {
        let passport = req.files.passport
        if (passport.mimetype.startsWith('image/')) {
            if (passport.size <= 1024 * 1024) {
                let fileName = `${student.email}-${uuid()}.${passport.name.split('.').pop()}`
                passport.mv('./uploads/' + fileName, (err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        student.passport = fileName
                    }
                })
            } else {
                return res.redirect('back')
            }
        } else {
            return redirect('back')
        }
    }

    let student_id = await student.save()
    let plan_student = new PlanStudent({ plan_id, student_id })
    await plan_student.save()
    res.redirect("/students")
}
let getStudents = async (req, res) => {
    let plans = await Plan.fetch();
    let students = await Student.fetch()
    for (const student of students) {
        student.plan = await PlanStudent.latestStudentPlan(student.id)
    }
    res.render('students', { students })
}
// let editStudent = async (req, res) => {
//     let student = await Student.findById(req.params.student_id)
//     let plans = await Plan.fetch()
//     student.plan = await PlanStudent.latestStudentPlan(student.id)
//     res.render('edit-student', { student, plans })
// }
let editStudent = async (req, res) => {
    let student = await Student.findById(req.params.student_id)
    let plans = await Plan.fetch();
    if (student) {
        res.render('edit-student', { student, plans })
    } else {
        res.redirect('/students')
    }
}
let updateStudent = async (req, res) => {
    let student = await Student.findById(req.params.student_id)
    let plans = await Plan.fetch();
    student.setProperties(req.body)
    await student.update()
    res.redirect('/students')
}
let deleteStudent = async (req, res) => {
    let student = await Student.findById(req.params.student_id)
    await student.delete()
    res.redirect('/students')
}
let details = async (req, res) => {
    let student = await Student.findById(req.params.student_id)
    let plans = await Plan.fetch();
    student.plan = await PlanStudent.latestStudentPlan(student.id)
    res.render("details", { student, plans })
}

module.exports = { addStudent, postStudent, getStudents, editStudent, updateStudent, deleteStudent, details }