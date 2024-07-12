const conexao = require('../db/conexao');

class orderController {
    async criar(request, response) { //metodo para criar os pedidos
        try {
            const { client_id, address, observations, items } = request.body;

            if (!client_id || !items || !Array.isArray(items) || items.length === 0) {
                return response.status(400).json({ message: 'Client ID e Items são obrigatórios!' });
            }

            let total = 0;
            for (const item of items) {
                const { product_id, amount, price } = item;

                if (!product_id || !amount || !price) {
                    return response.status(400).json({ message: 'Product ID, Amount e Price são obrigatórios!' });
                }

                total += amount * price;
            }

            const orderResult = await conexao.query(`
                INSERT INTO orders (client_id, total, address, observations)
                VALUES ($1, $2, $3, $4) returning id
            `, [client_id, total, address, observations]); // retorna o id do pedido

            const orderId = orderResult.rows[0].id;

            for (const item of items) {
                const { product_id, amount, price } = item;

                await conexao.query(`
                    INSERT INTO orders_items (order_id, product_id, amount, price)
                    VALUES ($1, $2, $3, $4)
                `, [orderId, product_id, amount, price]);
            } // insere os itens no pedido

            response.status(201).json({ message: 'Pedido criado com sucesso!', order_id: orderId });
        } catch (error) {
            console.error(error);
            response.status(500).json({ message: "ERRO INTERNO NO SERVIDOR" });
        }
    }

    async listar(request, response) { //metodo para listar um pedido com detalhes
        try {
            const id = request.params.id;

            const orderResult = await conexao.query(`
                SELECT
                    orders.id AS order_id,
                    clients.name AS nome_do_cliente,
                    orders.total AS total,
                    orders.address AS endereco,
                    orders.observations AS observacoes
                FROM
                    orders
                JOIN
                    clients
                ON
                    orders.client_id = clients.id
                WHERE
                    orders.id = $1;
            `, [id]); // retorna as informacoes do pedido

            if (orderResult.rows.length === 0) {
                return response.status(404).json({ message: 'Pedido de compra não encontrado' });
            }

            const order = orderResult.rows[0];

            const itemsResult = await conexao.query(`
                SELECT
                    orders_items.product_id AS id_do_produto,
                    products.name AS nome_do_produto,
                    orders_items.amount AS quantidade,
                    orders_items.price AS preco_unitario
                FROM
                    orders_items
                JOIN
                    products
                ON
                    orders_items.product_id = products.id
                WHERE
                    orders_items.order_id = $1;
            `, [id]); // retorna os itens do pedido

            order.items = itemsResult.rows;

            response.status(200).json(order);
        } catch (error) {
            console.error(error);
            response.status(500).json({ message: "ERRO INTERNO NO SERVIDOR" });
        }
    }
}

module.exports = new orderController();