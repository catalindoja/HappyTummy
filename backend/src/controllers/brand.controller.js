import {pool} from '../db.js'

export const getBrands = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM brand')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while retrieving the brands'
        })
    }
}

export const getBrand = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM brand WHERE id = ?', [req.params.id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while retrieving the brand'
        })
    }
}

export const createBrand = async (req, res) => {
    try {
        const {name} = req.body

        const [rows] = await pool.query(
            'INSERT INTO brand (name) VALUES (?)',
            [name])
        
        res.send({
            id: rows.insertId,
            name
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Something went wrong while creating the brand'
        })
    }
}

export const deleteBrand = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM brand WHERE id = ?', [req.params.id])
        if(result.affectedRows <= 0) return res.status(404).json({
            message: 'Brand not found'
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while deleting the brand'
        })
    }
}

export const updateBrand = async (req, res) => {
    try {
        const {id} = req.params
        const {name} = req.body

        const [result] = await pool.query('UPDATE brand SET name = ? WHERE id = ?', [name, id])
        if(result.affectedRows === 0) return res.status(404).json({
            message: 'Brand not found'
        })
        
        const [rows] = await pool.query('SELECT * FROM brand WHERE id = ?', [id])
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while updating the brand'
        })
    }
}