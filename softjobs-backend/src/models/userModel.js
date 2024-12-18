const pool = require('../config/db');

const getUserByEmail = async (email) => {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    return result.rows[0];
};

const createUser = async (email, password, rol, lenguage) => {
    const result = await pool.query(
        'INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING *',
        [email, password, rol, lenguage]
    );
    return result.rows[0];
};

module.exports = { getUserByEmail, createUser };
