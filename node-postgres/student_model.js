const Pool = require('pg').Pool

const pool = new Pool({
    user: 'my_user',
    host: 'localhost',
    database: 'rksp_pr7',
    password: 'root',
    port: 5432,
});

const getStudents = () => {
    return new Promise(function(resolve, reject) {
        pool.query('SELECT * FROM students ORDER BY id ASC', (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}
const createStudent = (body) => {
    return new Promise(function(resolve, reject) {
        const { name, email } = body
        pool.query('INSERT INTO students (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(`A new merchant has been added added: ${results.rows[0]}`)
        })
    })
}
const deleteStudent = (studentId) => {
    return new Promise(function(resolve, reject) {
        const id = parseInt(studentId)
        pool.query('DELETE FROM students WHERE id = $1', [id], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(`Merchant deleted with ID: ${id}`)
        })
    })
}

module.exports = {
    getStudents,
    createStudent,
    deleteStudent,
}


