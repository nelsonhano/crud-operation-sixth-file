const Plan = require("../models/Plan")

let addPlan = (req, res) => {
    res.render('add-plan')
}
let postPlan = async (req, res) => {
    let plan = new Plan(req.body)
    await plan.save()
    res.redirect("/plans")
}
let getPlans = async (req, res) => {
    let plans = await Plan.fetch()
    res.render('plans', { plans })
}
let editPlan = async (req, res) => {
    let plan = await Plan.findById(req.params.plan_id)
    if (plan) {
        res.render('edit-plan', { plan })
    } else {
        res.redirect('/plans')
    }
}
let updatePlan = async(req, res) => {
    let plan = await Plan.findById(req.params.plan_id)
    plan.setProperties(req.body)
    await plan.update()
    res.redirect('/plans')
}
let deletePlan = async(req, res) => {
    let plan = await Plan.findById(req.params.plan_id)
    await plan.delete()
    res.redirect('/plans')
}
// let details = async (req, res) => {
//     let plann = await Plan.findById(req.params.plan_id)
//     let plans = await Plan.fetch();
//     plann.plan = await planPlans.latestplanPlans(plan.id)
//     res.render("plan-detail", { student, plans })
// }
module.exports = { addPlan, postPlan, getPlans, editPlan, updatePlan, deletePlan}