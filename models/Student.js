const { query } = require('./connection');
const Model = require('./Model');
class Student extends Model {
    async save() {
        let reg_no = 1;
        let sql = `SELECT reg_no from students order by id desc limit 1`;
        let result = await query(sql);
        if (result.length > 0) {
            reg_no = Number(result[0].reg_no) + 1;
        }
        this.reg_no = reg_no.toString().padStart(4, '0');
        return await super.save();
    }
    get name() {
        return `${this.surname.toUpperCase()} ${this.first_name} `;
    }

    //get age of student
    get age() {
        return this.dob ? Math.floor((new Date() - new Date(this.dob)) / 31536000000) : 'Not set';
    }
    
}

module.exports = Student;