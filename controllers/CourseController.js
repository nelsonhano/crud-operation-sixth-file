const Course = require("../models/Course")
const Instructor = require("../models/Instructor")

let addCourse = async (req, res) => {
    let courses = await Course.fetch()
    let instructors = await Instructor.fetch()
    res.render('add-course', { instructors })
}
let postCourse = async (req, res) => {
    let course = new Course(req.body)
    await course.save()
    res.redirect("/courses")
}
let getCourses = async (req, res) => {
    let instructor = await Instructor.fetch()
    let courses = await Course.fetch()
    for (const course of courses) {
        course.instructor = await Instructor.findById(course.instructor_id)
    }
    res.render('courses', { courses, instructor })
}
let editCourse = async (req, res) => {
    let course = await Course.findById(req.params.course_id)
    let instructors = await Instructor.fetch();
    if (course) {
        res.render('edit-course', { course, instructors })
    } else {
        res.redirect('/courses')
    }
}
let updateCourse = async (req, res) => {
    let course = await Course.findById(req.params.course_id)
    let instructor = await Instructor.fetch()
    course.setProperties(req.body)
    await course.update()
    res.redirect('/courses')
}
let deleteCourse = async (req, res) => {
    let course = await Course.findById(req.params.course_id)
    await course.delete()
    res.redirect('/courses')
}
module.exports = { addCourse, postCourse, getCourses, editCourse, updateCourse, deleteCourse }