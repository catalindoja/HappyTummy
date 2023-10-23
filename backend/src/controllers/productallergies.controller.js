import {pool} from '../db.js'

export const getProductAllergies = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM productallergies')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while retrieving the productallergies'
        })
    }
}

export const getProductAllergy = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM productallergies WHERE id = ?', [req.params.id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while retrieving the productallergy'
        })
    }
}

export const createProductAllergy = async (req, res) => {
    try {
        const {idproduct, idallergies} = req.body

        const [rows] = await pool.query(
            'INSERT INTO productallergies (idproduct, idallergies) VALUES (?, ?)', 
            [idproduct, idallergies])

        res.send({
            id: rows.insertId,
            idproduct,
            idallergies
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while creating the productallergy'
        })
    }
}

export const deleteProductAllergy = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM productallergies WHERE id = ?', [req.params.id])
        if(result.affectedRows <= 0) return res.status(404).json({
            message: 'ProductAllergy not found'
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while deleting the productallergy'
        })
    }
}

export const updateProductAllergy = async (req, res) => {
    try {
        const {id} = req.params
        const {idproduct, idallergies} = req.body

        const [result] = await pool.query(
            'UPDATE productallergies SET idproduct = IFNULL(?, idproduct), idallergies = IFNULL(?, idallergies) WHERE id = ?', 
            [idproduct, idallergies, req.params.id])

        if(result.affectedRows === 0) return res.status(404).json({
            message: 'ProductAllergy not found'
        })

        const [rows] = await pool.query('SELECT * FROM productallergies WHERE id = ?', [id])
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while updating the productallergy'
        })
    }
}