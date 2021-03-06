import asyncHandler from 'express-async-handler'
import User from './../models/user.model.js'
import generateToken from '../utils/generateToken.js'

const authUser = asyncHandler(async(req, res) => {
    // destructure the email and password
    const { email, password } = req.body

    // find user
    const user = await User.findOne({ email})

    // check if the user exists
    if(user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id) //token with user id embedded in 
        })
    }
    else {
        res.status(401)
        throw new EvalError('Invalid email or password')
    }
}) 

//register user
const registerUser = asyncHandler(async(req, res) => {
    // destructure the email and password
    const {name,  email, password } = req.body

    // check if user exists
    const userExits = await User.findOne({ email})

    if (userExits) {
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid User data ')
    }
}) 

const getUserProfile = asyncHandler(async(req, res) => {

    // find user
    const user = await User.findById(req.user._id)

    // check for user
    if(user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    }
    else {
        res.status(404)
        throw new Error('User not found')
    }

    // check if the user exists
      res.send('Success')
}) 

// @access --Private
const updateUserProfile = asyncHandler(async(req, res) => {

    // find user
    const user = await User.findById(req.user._id)

    // check for user
    if(user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      if (req.body.password) {
          user.password = req.body.password
      }
      const updateUser = await user.save()

      res.json({
        _id: updateUser ._id,
        name: updateUser .name,
        email: updateUser .email,
        isAdmin: updateUser .isAdmin,
        token: generateToken(updateUser._id) //token with user id embedded in 
    })
    }
    else {
        res.status(404)
        throw new Error('User not found')
    }

    // check if the user exists
      res.send('Success')
}) 


// @access --Private/admin
// get all users
const getUsers = asyncHandler(async(req, res) => {

    // find user
    const users = await User.find({})
    res.json(users)
    
}) 
//delete User
const deleteUsers = asyncHandler(async(req, res) => {
    // find user
    const users = await User.findById(req.params.id)
    if (users) {
        await users.remove()
        res.json({
            message: 'User removed'
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
    
}) 
//get user By ID
const getUserById = asyncHandler(async(req, res) => {

    // find user
    const users = await User.findById(req.params.id).select('-password')
    if (users){
        res.json(users)
    } else {
        res.status(404)
        throw new Error('User not found ')
    }
    
    
}) 

const updateUser = asyncHandler(async(req, res) => {

    // find user by logged in user
    const user = await User.findById(req.params.id)

    // check for user
    if(user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      user.isAdmin = req.body.isAdmin

      const updateUser = await user.save()

      res.json({
        _id: updateUser ._id,
        name: updateUser .name,
        email: updateUser .email,
        isAdmin: updateUser .isAdmin
    })
    }
    else {
        res.status(404)
        throw new Error('User not found')
    }
}) 

export { 
    authUser, 
    getUserProfile, 
    registerUser, 
    updateUserProfile, 
    getUsers,
    deleteUsers,
    getUserById,
    updateUser
}