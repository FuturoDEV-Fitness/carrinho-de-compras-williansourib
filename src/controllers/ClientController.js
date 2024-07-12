const conexao = require('../db/conexao')
const { validarEFormatarCpf } = require('../utils/cpfUtils');
const { formatarContact } = require('../utils/contactUtils');
const { validarEmail } = require('../utils/emailUtils');

class clientController {
    async criar(request, response) {
        try {
            const dados = request.body

            const emailFormatado = validarEmail(dados.email)
            const cpfFormatado = validarEFormatarCpf(dados.cpf)
            const contactFormatado = formatarContact(dados.contact)
            const cpfEXistente = await conexao.query
                (`
            SELECT cpf FROM clients WHERE cpf = $1
            `, [dados.cpf])

            if (!dados.name || !dados.email || !dados.cpf || !dados.contact) {
                return response.status(400).json({ message: 'Preencha todos os campos!' })
            } else if (!emailFormatado) {
                return response.status(400).json({ message: 'Email invalido!' })
            } else if (!cpfFormatado) {
                return response.status(400).json({ message: 'CPF invalido!' })
            } else if (cpfEXistente.rows.length > 0) {
                return response.status(400).json({ message: 'CPF ja existente!' })
            } else if (!contactFormatado) {
                return response.status(400).json({ message: 'Contato invalido!' })
            }

            const client = await conexao.query(
                `
                INSERT INTO clients (name, email, cpf, contact)
                values($1, $2, $3, $4) returning *
            `,
                [dados.name, dados.email, cpfFormatado, contactFormatado]
            )

            response.status(201).json(client.rows[0])
        } catch (error) {
            console.log(error)
            response.status(500).json({ message: "ERRO INTERNO NO SERVIDOR" })
        }
    }
}

module.exports = new clientController()