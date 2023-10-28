import {pool} from '../db.js'

export const getUsers = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM user')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while retrieving the users'
        })
    }
}

export const getUser = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM user WHERE id = ?', [req.params.id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while retrieving the user'
        })
    }
}

export const createUser = async (req, res) => {
    try {
        const {idsupermarket, username, password, email, role, premium, image, image_url} = req.body

        const [rows] = await pool.query(
            'INSERT INTO user (idsupermarket, username, password, email, role, premium, image, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
            [idsupermarket, username, password, email, role, premium, image, image_url])

        res.send({
            id: rows.insertId,
            idsupermarket,
            idsupermarket,
            username,
            email,
            role,
            premium,
            image,
            image_url
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while creating the user'
        })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM user WHERE id = ?', [req.params.id])
        if(result.affectedRows <= 0) return res.status(404).json({
            message: 'User not found'
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while deleting the user'
        })
    }
}

export const updateUser = async (req, res) => {
    try {
        const {id} = req.params
        const {password, email, premium, image, image_url} = req.body
        const [result] = 
            await pool.query('UPDATE user SET password = IFNULL(?, password), email = IFNULL(?, email), premium = IFNULL(?, premium), image = IFNULL(?, image), image_url = IFNULL(?, image_url) WHERE id = ?',
            [password, email, premium, image, image_url, id])

        if(result.affectedRows === 0) return res.status(404).json({
            message: 'User not found'
        })

        const [rows] = await pool.query('SELECT * FROM user WHERE id = ?', [id])
        res.json(rows);
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Something went wrong while updating the user'
        })
    }
}