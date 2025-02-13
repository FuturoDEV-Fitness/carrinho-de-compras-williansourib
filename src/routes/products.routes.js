const { Router } = require('express')
const ProductController = require('../controllers/ProductController')
const productRoutes = new Router()

productRoutes.post('/', ProductController.criar)
productRoutes.get('/', ProductController.listar)
productRoutes.get('/:id', ProductController.listarComDetalhes)

module.exports = productRoutes