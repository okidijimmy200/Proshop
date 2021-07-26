import express from 'express'
import connectDB  from './config/db.js'
import colors from 'colors'
import dotenv from 'dotenv'

import { errorHandler, notFound,  } from './middleware/errors.middleware.js'
import productRoutes from './routes/product.routes.js'


dotenv.config({path: './config.env'})

connectDB()

const app = express()

app.get('/', (req, res) => {
    res.send('API is running')
})

app.use('/api/products', productRoutes)

// fallback for 404 errors
app.use(notFound)

// error middleware
app.use(errorHandler)

const PORT = process.env.PORT || 9000
console.log(PORT)

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))