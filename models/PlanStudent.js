const { query } = require('./connection');
const Model = require('./Model');
const Plan = require('./Plan');
class PlanStudent extends Model {
    static get tableName() {
        return "plans_students";
    }

    static async latestStudentPlan(student_id) {
        let sql = `SELECT * from plans where id in (SELECT plan_id from plans_students where student_id = ${student_id})`;
        let result = await query(sql);
        if (result.length > 0) {
            return new Plan(result[0])
        } else {
            return null
        }
    }
}
module.exports = PlanStudent;