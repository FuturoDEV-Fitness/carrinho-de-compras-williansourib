const { Pool } = require('pg')

const conexao = new Pool({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "postegres",
    database: "lab_commerce_bd",
})

module.exports = conexao