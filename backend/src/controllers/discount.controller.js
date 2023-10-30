import {pool} from '../db.js'

/**
 * Recovers the discounts from the database
 * @async
 * @param {Request} req 
 * @param {Response} res 
 * @returns {JSON} JSON containg the recovered data
 */
export const getDiscounts = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM discount')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while retrieving the discounts'
        })
    }
}

/**
 * Recovers a specific discount from the database
 * @async
 * @param {Request} req 
 * @param {Response} res 
 * @returns {JSON} JSON containg the recovered data
 */
export const getDiscount = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM discount WHERE id = ?', [req.params.id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while retrieving the discount'
        })
    }
}

/**
 * Creates a new discount entry
 * @async
 * @param {Request} req 
 * @param {Response} res 
 * @returns {JSON} JSON containg the newly created data
 */
export const createDiscount = async (req, res) => {
    try {
        const {idclient, idsupermarket, percentage, expiration} = req.body

        const [rows] = await pool.query(
            'INSERT INTO discount (idclient, idsupermarket, percentage, expiration) VALUES (?, ?, ?, ?)', 
            [idclient, idsupermarket, percentage, expiration])

        res.send({
            id: rows.insertId,
            idclient,
            idsupermarket,
            percentage,
            expiration
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while creating the discount'
        })
    }
}

/**
 * Deletes a specific entry from the discount table
 * @async
 * @param {Request} req 
 * @param {Response} res 
 * @returns {CodecState} Code confirming a succsesful operation
 */
export const deleteDiscount = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM discount WHERE id = ?', [req.params.id])
        if(result.affectedRows <= 0) return res.status(404).json({
            message: 'Discount not found'
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while deleting the discount'
        })
    }
}

/**
 * Updates an existing discount entry
 * @async
 * @param {Request} req 
 * @param {Response} res 
 * @returns {JSON} Json containing the new information
 */
export const updateDiscount = async (req, res) => {
    try {
        const {id} = req.params
        const {idclient, idsupermarket, percentage, expiration} = req.body

        const [result] = await pool.query(
            'UPDATE discount SET idclient = IFNULL(?, idclient), idsupermarket = IFNULL(?, idsupermarket), percentage = IFNULL(?, percentage), expiration = IFNULL(?, expiration) WHERE id = ?',
            [idclient, idsupermarket, percentage, expiration, id])

        if(result.affectedRows === 0) return res.status(404).json({
            message: 'Discount not found'
        })

        const [rows] = await pool.query('SELECT * FROM discount WHERE id = ?', [id])
        res.json(rows)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Something went wrong while updating the discount'
        })
    }
}