import {pool} from '../db.js'

export const getProducts = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM product')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while retrieving the products'
        })
    }
}

export const getProduct = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM product WHERE id = ?', [req.params.id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while retrieving the product'
        })
    }
}

export const createProduct = async (req, res) => {
    try {
        const {iduser, idcategory, idallergy, barcode, product_name, traces, brand, product_description, price, likes, image} = req.body

        const [rows] = await pool.query(
            'INSERT INTO product (iduser, idcategory, idallergy, barcode, product_name, traces, brand, product_description, price, likes, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [iduser, idcategory, idallergy, barcode, product_name, traces, brand, product_description, price, likes, image])
        
        res.send({
            id: rows.insertId,
            iduser,
            idcategory,
            idallergy,
            barcode,
            product_name,
            traces,
            brand,
            product_description,
            price,
            likes,
            image
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while creating the product'
        })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM product WHERE id = ?', [req.params.id])
        if(result.affectedRows <= 0) return res.status(404).json({
            message: 'Product not found'
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while deleting the product'
        })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const {id} = req.params
        const {iduser, idcategory, idallergy, barcode, product_name, traces, brand, product_description, price, likes, image} = req.body

        const [result] = await pool.query(
            'UPDATE product SET iduser = IFNULL(?, iduser), idcategory = IFNULL(?, idcategory), idallergy = IFNULL(?, idallergy), barcode = IFNULL(?, barcode), product_name = IFNULL(?, product_name), traces = IFNULL(?, traces), brand = IFNULL(?, brand), product_description = IFNULL(?, product_description), price = IFNULL(?, price), likes = IFNULL(?, likes), image = IFNULL(?, image) WHERE id = ?',
            [iduser, idcategory, idallergy, barcode, product_name, traces, brand, product_description, price, likes, image, id])
        
        if(result.affectedRows <= 0) return res.status(404).json({
            message: 'Product not found'
        })

        const [rows] = await pool.query('SELECT * FROM product WHERE id = ?', [id])
        res.json(rows)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Something went wrong while updating the product'
        })
    }
}