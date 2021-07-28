import jwt from 'jsonwebtoken'

// func for generate token(userId as payload for the token)

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

export default generateToken;