import {pool} from '../db.js'

export const getShoppingLists = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM shoppinglist')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while retrieving the shoppinglists'
        })
    }
}

export const getShoppingList = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM shoppinglist WHERE id = ?', [req.params.id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while retrieving the shoppinglist'
        })
    }
}

export const createShoppingList = async (req, res) => {
    try {
        const {id, creationdate, idUser} = req.body

        const [rows] = await pool.query(
            'INSERT INTO shoppinglist (creationdate, idUser) VALUES (?, ?)', 
            [creationdate, idUser])

        res.send({
            id: rows.insertId,
            creationdate, 
            idUser
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Something went wrong while creating the shopping list'
        })
    }
}

export const deleteShoppingList = async (req, res) => {
    try {
        await pool.query('DELETE FROM shoppinglist WHERE id = ?', [req.params.id])
        res.json({message: 'Shopping list deleted successfully'})
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while deleting the shopping list'
        })
    }
}

export const updateShoppingList = async (req, res) => {
    try {
        const {id} = req.params
        const {creationdate} = req.body

        const [result] = await pool.query(
            'UPDATE shoppinglist SET creationdate = IFNULL(?, creationdate) WHERE id = ?', 
            [creationdate, id])

        if(result.affectedRows <= 0) return res.status(404).json({
            message: 'Product list not found'
        })

        const [rows] = await pool.query('SELECT * FROM shoppinglist WHERE id = ?', [id])
        res.json(rows)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Something went wrong while updating the shopping list'
        })
    }
}