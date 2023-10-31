const conn = require("./connection");


async function register(req, res) {
    const { name, email, password, imgPath } = req.body;

    const sql = 'INSERT INTO users (name, email, password, profile_pic) VALUES (?, ?, ?, ?)';
    const values = [name, email, password, imgPath];

    conn.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting user data:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.status(201).json({ message: 'User Signup successfully' });
    });
} 

async function getData(req, res) {
    const {id} = req.query;
    const sql = 'SELECT * FROM users WHERE id = ?';
    const values = [id];

    conn.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        const user = results[0];
        res.json(user);
    });
} 

async function login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ error: 'Email and password are required' });
        return;
    }
    const sql = 'SELECT * FROM users WHERE email = ?';
    conn.query(sql, [email], (err, results) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        if (results.length === 0) {
            res.status(401).json({ error: 'Invalid email or password' });
            return;
        }
        const user = results[0];
        if (user.password !== password) {
            res.status(401).json({ error: 'Invalid email or password' });
            return;
        }
        res.json({ message: 'Login successful', user });
    });
} 

module.exports = {
    register:register,
    getData:getData,
    login:login,
}
