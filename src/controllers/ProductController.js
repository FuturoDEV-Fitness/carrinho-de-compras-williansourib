const conexao = require('../db/conexao')
const { validarAmount } = require('../utils/amountUtils');
const { validarId } = require('../utils/idUtils');

class productController {

    async criar(request, response) { //metodo para criar os produtos

        try {
            const dados = request.body

            const amountValidado = validarAmount(dados.amount)
            const idValidado = validarId(dados.category_id)

            if (!dados.name || !dados.category_id) {
                return response.status(400).json({ message: 'Name e Category ID sao obrigatorios!' })
            } else if (!amountValidado) {
                return response.status(400).json({ message: 'Amount invalido! (Apenas numeros)' })
            } else if (dados.voltage && dados.voltage !== '110' && dados.voltage !== '220') {
                return response.status(400).json({ message: 'Voltage invalido! (110 ou 220)' })
            } else if (!idValidado) {
                return response.status(400).json({ message: 'ID invalido! (Apenas numeros)' })
            }

            const product = await conexao.query(`
                INSERT INTO products (name, amount, color, voltage, description, category_id)
                VALUES ($1, $2, $3, $4, $5, $6) returning *   
            `, [dados.name, amountValidado, dados.color, dados.voltage, dados.description, dados.category_id])

            response.status(201).json(product.rows[0])
        } catch (error) {
            console.log(error)
            response.status(500).json({ message: "ERRO INTERNO NO SERVIDOR" })
        }

    }

    async listar(request, response) { //metodo para listar os produtos
        try {
            const filtros = request.query;

            if (filtros.filtro) {
                const product = await conexao.query(
                    `
                select * from products
                where nome ilike $1
                or
                descricao ilike $1
            `,
                    [`%${filtros.filtro}%`]
                );

                response.json(product.rows);
            } else {
                const product = await conexao.query(`
                select * from products
         `);
                response.status(200).json(product.rows);
            }
        } catch (error) {
            console.log(error)
            response.status(500).json({ message: "ERRO INTERNO NO SERVIDOR" })
        }
    }

    async listarComDetalhes(request, response) { //metodo para listar um produto com detalhes
        try {
            const id = request.params.id;

            const product = await conexao.query(`
                SELECT 
                    products.name AS nome_produto, 
                    products.amount AS quantidade, 
                    products.color AS cor, 
                    products.voltage AS tensão,
                    products.description AS descrição,
                    categories.name AS categoria 
                FROM 
                    products 
                JOIN 
                    categories 
                ON 
                    products.category_id = categories.id
                WHERE
                    products.id = $1
            `, [id]);

            if (product.rows.length === 0) {
                return response.status(404).json({ message: 'Produto não encontrado' });
            }

            response.status(200).json(product.rows[0])
        } catch (error) {
            console.log(error)
            response.status(500).json({ message: "ERRO INTERNO NO SERVIDOR" })
        }
    }
}

module.exports = new productController()