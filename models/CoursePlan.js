const Model = require('./Model');
class CoursePlan extends Model {
    static get tableName() {
        return "course_plans";
    }
}
module.exports = CoursePlan;