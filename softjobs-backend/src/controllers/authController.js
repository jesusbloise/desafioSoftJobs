const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getUserByEmail, createUser } = require('../models/userModel');

const register = async (req, res) => {
    try {
        const { email, password, rol, lenguage } = req.body;

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await createUser(email, hashedPassword, rol, lenguage);
        res.status(201).json({ message: 'Usuario registrado', user: newUser });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await getUserByEmail(email);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Crear token
        const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY);
        res.json({ message: 'Login exitoso', token });
    } catch (error) {
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};

const getUser = async (req, res) => {
    try {
        const { email } = req.user; // Extraído del token
        const user = await getUserByEmail(email);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuario' });
    }
};

module.exports = { register, login, getUser };
