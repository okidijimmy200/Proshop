import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: String,
        required: true,
        default: false
    },
}, {
    // to create the created at time fields and updated at
    timestamps: true
})

// method for encryption
userSchema.methods.matchPassword = async function(enteredPassword) {
    // compare plain text to encrypted password
    return await bcrypt.compare(enteredPassword, this.password)
}

// userSchema Password encryption
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})
const User = mongoose.model('User', userSchema)

export default User