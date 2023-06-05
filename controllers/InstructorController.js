const Instructor = require("../models/Instructor")

let addInstructor = (req, res) => {
    res.render('add-instructor')
}
let postInstructor = async (req, res) => {
    let {confirm_password, ...otherfields} = req.body
    let instructor = new Instructor(otherfields)
    await instructor.save()
    res.redirect("/instructors")
}
let getInstructors = async (req, res) => {
    let instructors = await Instructor.fetch()
    res.render('instructors', { instructors })
}
let editInstructor = async (req, res) => {
    let instructor = await Instructor.findById(req.params.instructor_id)
    if (instructor) {
        res.render('edit-instructor', { instructor })
    } else {
        res.redirect('/instructors')
    }
}
let updateInstructor = async(req, res) => {
    let instructor = await Instructor.findById(req.params.instructor_id)
    let { confirm_password, ...otherFields } = req.body
    instructor.setProperties(otherFields)
    await instructor.update()
    res.redirect('/instructors')
}
let deleteInstructor = async(req, res) => {
    let instructor = await Instructor.findById(req.params.instructor_id)
    await instructor.delete()
    res.redirect('/instructors')
}
module.exports = { addInstructor, postInstructor, getInstructors, editInstructor, updateInstructor, deleteInstructor }