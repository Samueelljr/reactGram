const User = require('../models/User')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const jwtSecret = process.env.JWT_SECRET

// generate user token
const generateToken = (id) => {
    return jwt.sign({ id }, jwtSecret, {
        expiresIn: "7d"
    })
}

// registro de usuario
const register = async (req, res) => {
    
    const {name, email, password} = req.body

    // check se email existe no bd
    const user = await User.findOne({ email })

    if(user) {
        res.status(422).json({ errors: ["Email já cadastrado, utilize outro email."]})
        return
    }

    // Gerando password com hash
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    // criação de usuário
    const newUser = await User.create({
        name,
        email,
        password: passwordHash
    })

    // gerando token, apos usuario cadastrado
    if(!newUser) {
        res.status(422).json({ errors: ["Houve um erro, por favor tente mais tarde."]})
        return
    }

    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id)
    })
}

// login de usuario
const login = async (req, res) => {
    
    const {email, password} = req.body

    // check se email existe no bd
    const user = await User.findOne({ email })

    if(!user) {
        res.status(404).json({ errors: ["Email não encontrado."]})
        return
    }

    // check se senhas são iguais, usando o bcrypt
    if(!(await bcrypt.compare(password, user.password))) {
        res.status(422).json({ errors: ["Senha inválida."]})
        return
    }

    // return de token do usuario
    res.status(201).json({
        _id: user._id,
        profileImage: user.profileImage,
        token: generateToken(user._id)
    });
}

// get current logged in user
const getCurrentUser = async (req, res) => {
    const user = req.user

    res.status(200).json(user)
}

module.exports = {
    register,
    login,
    getCurrentUser
}