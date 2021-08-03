import asyncHandler from 'express-async-handler'
import Order from './../models/order.model.js'

const addOrderItems = asyncHandler(async(req, res) => {
    const { 
        orderItems, 
        shippingAddress, 
        paymentMethod, 
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
     } = req.body

    // check if order items is not empty
    if(orderItems && orderItems.length === 0)  {
        res.status(400)
        throw new Error('No order items')
        return 
    } else {
        const order = new Order({
            orderItems, 
            // attach users
            user: req.user._id,
            shippingAddress, 
            paymentMethod, 
            itemsPrice,
            shippingPrice,
            taxPrice, 
            totalPrice
        })
        // to save in the db
        const createdOrder = await order.save()

        res.status(201).json(createdOrder)
    }
})


//get order by ID
const getOrderById = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if (order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

//update order to paid
const updateOrderToPaid = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: re.body.update_time,
            email_address: req.body.payer.email_address
        }

    const updatedOrder = await order.save()
    res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})


//update order to paid
const getMyOrders = asyncHandler(async(req, res) => {
    const orders = await Order.find({ user: req.user.id })
    res.json(orders)

    
})
export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders  } 