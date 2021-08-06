import asyncHandler from 'express-async-handler'
import Product from './../models/product.model.js'

const getProducts = asyncHandler(async(req, res) => {
    const products = await Product.find({})
    res.json(products)
})

const getProductById = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        res.json(product)
    }
    else {
        res.status(404)
        throw new Error('Product not found')
    }
    
})

//delete product
const deleteProduct = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        await product.remove()
        res.json({ message: 'Product Removed' })
    }
    else {
        res.status(404)
        throw new Error('Product not found')
    }
    
})

const createProduct = asyncHandler(async(req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/image/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample Description'
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
    
})

//update product
const updateProduct = asyncHandler(async(req, res) => {
    const { 
        name, 
        price,
        image,
        description, 
        brand, 
        category, 
        countInStock } = req.body
    
        const product = await Product.findById(req.params.id)

        if (product) {
            product.name = name
            product.price = price
            product.description = description
            product.image = image
            product.brand = brand
            product.category = category
            product.countInStock = countInStock

            const createdProduct = await product.save()
            res.status(201).json(updateProduct)
        } else {
            res.status(401)
            throw new Error('Product not found')
        }
    
})


export { getProducts, getProductById, deleteProduct,createProduct, updateProduct }