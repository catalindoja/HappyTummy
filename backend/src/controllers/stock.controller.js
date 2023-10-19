import {pool} from '../db.js'

export const getStocks = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM stock')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while retrieving the stocks'
        })
    }
}

export const getStock = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM stock WHERE id = ?', [req.params.id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while retrieving the stock'
        })
    }
}

export const createStock = async (req, res) => {
    try {
        const {idsupermarket, idproduct, available} = req.body

        const [rows] = await pool.query(
            'INSERT INTO stock (idsupermarket, idproduct, available) VALUES (?, ?, ?)', 
            [idsupermarket, idproduct, available])

        res.send({
            id: rows.insertId,
            idsupermarket,
            idproduct,
            available
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while creating the stock'
        })
    }
}

export const deleteStock = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM stock WHERE id = ?', [req.params.id])
        if(result.affectedRows <= 0) return res.status(404).json({
            message: 'Stock not found'
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while deleting the stock'
        })
    }
}

export const updateStock = async (req, res) => {
    try {
        const {id} = req.params
        const {idsupermarket, idproduct, available} = req.body
        const [result] = await pool.query('UPDATE stock SET idsupermarket = IFNULL(?, idsupermarket), idproduct = IFNULL(?, idproduct), available = IFNULL(?, available) WHERE id = ?', 
        [idsupermarket, idproduct, available, id])

        if(result.affectedRows === 0) return res.status(404).json({
            message: 'Stock not found'
        })
        
        const [rows] = await pool.query('SELECT * FROM stock WHERE id = ?', [id])
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while updating the stock'
        })
    }
}