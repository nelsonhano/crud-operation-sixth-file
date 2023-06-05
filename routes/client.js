const { Router } = require('express');
const { add } = require('nodemon/lib/rules');
const { resolve } = require('path');
const Instructor = require('../models/Instructor');
const Plan = require('../models/Plan');
const Student = require('../models/Student');
const Course = require('../models/Course');
const PlanStudent = require('../models/PlanStudent');
const { addPlan, postPlan, getPlans, editPlan, updatePlan, deletePlan } = require('../controllers/PlanController');
const { addInstructor, postInstructor, getInstructors, editInstructor, updateInstructor, deleteInstructor } = require('../controllers/InstructorController');
const { addStudent, postStudent, getStudents, editStudent, updateStudent, deleteStudent, details } = require('../controllers/StudentController');
const { deleteCourse, addCourse, postCourse, getCourses, editCourse, updateCourse } = require('../controllers/CourseController');
const studentValidators = require('../validators/studentValidator');

const router = Router();

//Plan routes
router.get('/add-plan', addPlan)
router.post('/add-plan', postPlan)
router.get('/plans', getPlans)
router.get('/edit-plan/:plan_id', editPlan)
router.post('/edit-plan/:plan_id', updatePlan)
router.get('/delete-plan/:plan_id', deletePlan);
router.get('/plan-detail/:student_id', details);


//Instructor routes
router.get('/add-instructor', addInstructor)
router.post('/add-instructor', postInstructor)
router.get('/instructors', getInstructors)
router.get('/edit-instructor/:instructor_id', editInstructor)
router.post('/edit-instructor/:instructor_id', updateInstructor)
router.get('/delete-instructor/:instructor_id', deleteInstructor);

//Student routes
router.get('/add-student', addStudent)
router.post('/add-student', postStudent)
router.get('/students', getStudents)
router.get('/edit-student/:student_id', editStudent)
router.post('/edit-student/:student_id', updateStudent)
router.get('/delete-student/:student_id', deleteStudent)
router.get('/detail-detail/:student_id', details);


//Course routes
router.get('/add-course', addCourse)
router.post('/add-course', postCourse)
router.get('/courses', getCourses)
router.get('/edit-course/:course_id', editCourse)
router.post('/edit-course/:course_id', updateCourse)
router.get('/delete-course/:course_id', deleteCourse);

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/about', (req, res) => {
    res.render('about');
});
router.get('/contact', (req, res) => {
    res.render('contact');
});
module.exports = router;