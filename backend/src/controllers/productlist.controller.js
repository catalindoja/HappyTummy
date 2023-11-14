import {pool} from '../db.js'

export const getProductLists = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM productList')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while retrieving the productlists'
        })
    }
}

export const getProductList = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM productList WHERE idShoppingList = ?', [req.params.id])
        res.json(rows[0])
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something went wrong while retrieving the productlist'
        })
    }
}

export const createProductList = async (req, res) => {
    try {
        const {idShoppingList, idProduct, quantity} = req.body

        const [rows] = await pool.query(
            'INSERT INTO productList (idShoppingList, idProduct, quantity) VALUES (?, ?, ?)', 
            [idShoppingList, idProduct, quantity])

        res.send({
            id: rows.insertId,
            idShoppingList,
            idProduct,
            quantity
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Something went wrong while creating the product list'
        })
    }
}

export const deleteProductList = async (req, res) => {
    try {
        await pool.query('DELETE FROM productList WHERE id = ?', [req.params.id])
        res.json({message: 'Product list deleted successfully'})
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while deleting the product list'
        })
    }
}

export const updateProductList = async (req, res) => {
    try {
        const {id} = req.params
        const {quantity} = req.body

        const [result] = await pool.query(
            'UPDATE productList SET quantity = IFNULL(?, quantity) WHERE idShoppingList = ?', 
            [idShoppingList, idProduct, quantity, id])

        if(result.affectedRows <= 0) return res.status(404).json({
            message: 'Product list not found'
        })

        const [rows] = await pool.query('SELECT * FROM productList WHERE idShoppingList = ?', [id])
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while updating the product list'
        })
    }
}