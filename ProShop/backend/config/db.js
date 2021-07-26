import mongoose from 'mongoose'
import dotenv from 'dotenv'


dotenv.config({path: './config.env'})

const DB = process.env.DATABASE_LOCAL
console.log(DB)

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(DB, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    } catch(error) {
        console.error(`Error: ${error.message}`.red.underline.bold)
        process.exit(1)

    }
}

export default connectDB