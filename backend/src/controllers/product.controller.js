import {pool} from '../db.js'

/**
 * Recovers the products from the database
 * @async
 * @param {Request} req 
 * @param {Response} res 
 * @returns {JSON} JSON containg the recovered data
 */
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

/**
 * Recovers a specific product from the database
 * @async
 * @param {Request} req 
 * @param {Response} res 
 * @returns {JSON} JSON containg the recovered data
 */
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

/**
 * Creates a new product entry
 * @async
 * @param {Request} req 
 * @param {Response} res 
 * @returns {JSON} JSON containg the newly created data
 */
export const createProduct = async (req, res) => {
    try {
        const {iduser, idcategory, idallergy, barcode, product_name, quantity, measurement, idbrand, product_description, price, likes, image, image_url} = req.body

        const [rows] = await pool.query(
            'INSERT INTO product (iduser, idcategory, idallergy, barcode, product_name, quantity, measurement, idbrand, product_description, price, likes, image, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [iduser, idcategory, idallergy, barcode, product_name, quantity, measurement, idbrand, product_description, price, likes, image, image_url])
        
        res.send({
            id: rows.insertId,
            iduser,
            idcategory,
            idallergy,
            barcode,
            product_name,
            quantity,
            measurement,
            idbrand,
            product_description,
            price,
            likes,
            image,
            image_url
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Something went wrong while creating the product'
        })
    }
}

/**
 * Deletes a specific entry from the product table
 * @async
 * @param {Request} req 
 * @param {Response} res 
 * @returns {CodecState} Code confirming a succsesful operation
 */
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

/**
 * Updates an existing product entry
 * @async
 * @param {Request} req 
 * @param {Response} res 
 * @returns {JSON} Json containing the new information
 */
export const updateProduct = async (req, res) => {
    try {
        const {id} = req.params
        const {iduser, idcategory, idallergy, barcode, product_name, quantity, measurement, idbrand, product_description, price, likes, image, image_url} = req.body

        const [result] = await pool.query(
            'UPDATE product SET iduser = IFNULL(?, iduser), idcategory = IFNULL(?, idcategory), idallergy = IFNULL(?, idallergy), barcode = IFNULL(?, barcode), product_name = IFNULL(?, product_name), quantity = IFNULL(?, quantity), measurement = IFNULL(?, measurement), idbrand = IFNULL(?, idbrand), product_description = IFNULL(?, product_description), price = IFNULL(?, price), likes = IFNULL(?, likes), image = IFNULL(?, image), image_url = IFNULL(?, image_url) WHERE id = ?',
            [iduser, idcategory, idallergy, barcode, product_name, quantity, measurement, idbrand, product_description, price, likes, image, image_url, id])
        
        if(result.affectedRows === 0) return res.status(404).json({
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

/**
 * Recovers the products posted by a specific user from the database
 * @async
 * @param {Request} req 
 * @param {Response} res 
 * @returns {JSON} JSON containg the recovered data
 */
export const getProductByUserId = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM product WHERE iduser = ?', [req.params.iduser])
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while retrieving the product'
        })
    }
}

/**
 * Recovers the products from a specific brand from the database
 * @async
 * @param {Request} req 
 * @param {Response} res 
 * @returns {JSON} JSON containg the recovered data
 */
export const getProductByBrandId = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM product WHERE idbrand = ?', [req.params.idbrand])
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while retrieving the product'
        })
    }
}

/**
 * Recovers the products from a specific category from the database
 * @async
 * @param {Request} req 
 * @param {Response} res 
 * @returns {JSON} JSON containg the recovered data
 */
export const getProductByCategoryId = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM product WHERE idcategory = ?', [req.params.idcategory])
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while retrieving the product'
        })
    }
}

/**
 * Recovers the products from a specific market from the database
 * @async
 * @param {Request} req 
 * @param {Response} res 
 * @returns {JSON} JSON containg the recovered data
 */
export const getProductBySupermarketId = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM stock WHERE idsupermarket = ? AND available = TRUE', [req.params.idsupermarket])
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while retrieving the product'
        })
    }
}