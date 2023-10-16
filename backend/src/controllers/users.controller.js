import {pool} from '../db.js'

export const getUsers = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM user')
    res.json(rows[0])
}

export const getUser = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM user WHERE id = ?', [req.params.id])
    res.json(rows[0])
}

export const createUser = async (req, res) => {
    console.log(req.body)
    const {username, password, email, role, premium} = req.body
    const [rows] = await pool.query(
        'INSERT INTO user (username, password, email, role, premium) VALUES (?, ?, ?, ?, ?)', 
        [username, password, email, role, premium])
    res.send( {
        id: rows.insertId,
        username,
        email,
        role,
        premium
    })
}

export const updateUser = (req, res) => res.send("updating user")

export const deleteUser = (req, res) => res.send("deleting user")
