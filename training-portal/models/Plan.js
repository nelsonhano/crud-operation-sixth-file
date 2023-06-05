const mysql = require('mysql');
const util = require('util');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'alusoft_portal'
})
connection.connect(err => console.log(err || 'Connected to the database'));
let query = util.promisify(connection.query.bind(connection))
class Plan {
    constructor(name, price, description, created_at = null, updated_at = null, id = null ) {
        this.id = id;
        this.name = name;
        this.price = price;        
        this.description = description;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    async save() {
        let sql = `INSERT INTO plans (name, price, description) VALUES ('${this.name}', '${this.price}', '${this.description}')`
        let result = await query(sql)
        this.id = result.insertId
        return result.insertId
    }

    static async fetch(){
        let plans = []
        let sql = `SELECT * FROM plans`
        let results = await query(sql);
        for (const row of results) {
            plans.push(new Plan(row.name, row.price, row.description, row.created_at, row.updated_at, row.id))
        }
        return plans        
    }
    

    
}

module.exports = Plan;