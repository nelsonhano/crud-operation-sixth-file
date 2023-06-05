const { Router } = require('express');
const { resolve } = require('path');
const Plan = require('../models/Plan');

const router = Router();
router.get('/', (req, res) => {
    res.sendFile(resolve('views', 'index.html'));
});

router.get('/about', (req, res) => {
    res.sendFile(resolve('views', 'about.html'));
});
router.get('/contact', (req, res) => {
    res.sendFile(resolve('views', 'contact.html'));
});
router.get('/register', (req, res) => {
    res.sendFile(resolve('views', 'register.html'));
});
router.post('/register-submit', (req, res) => {
    let { surname, first_name, other_name, dob, plan, email, phone, disability, gender, password } = req.body
    console.log(req.body);
})
router.get('/add-plan', (req, res) => {
    res.sendFile(resolve('views', 'add-plan.html'))
})
router.post('/add-plan', async (req, res) => {
    let { name, price, description } = req.body
    let plan = new Plan(name, price, description)
    await plan.save()
    res.redirect("/plans")
})
router.get('/plans', async (req, res) => {
    let plans = await Plan.fetch();    
    res.render('plans', {plans})
})
module.exports = router;