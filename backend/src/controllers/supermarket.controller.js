import {pool} from '../db.js'

/**
 * Recovers the markets from the database
 * @async
 * @param {Request} req 
 * @param {Response} res 
 * @returns {JSON} JSON containg the recovered data
 */
export const getMarkets = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM supermarket')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while retrieving the supermarkets'
        })
    }
}

/**
 * Recovers a specific market from the database
 * @async
 * @param {Request} req 
 * @param {Response} res 
 * @returns {JSON} JSON containg the recovered data
 */
export const getMarket = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM supermarket WHERE id = ?', [req.params.id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while retrieving the supermarket'
        })
    }
}

/**
 * Creates a new market entry
 * @async
 * @param {Request} req 
 * @param {Response} res 
 * @returns {JSON} JSON containg the newly created data
 */
export const createMarket = async (req, res) => {
    try {
        const {name, description, address, city, zipcode, image, image_url} = req.body

        const [rows] = await pool.query(
            'INSERT INTO supermarket (name, description, address, city, zipcode, image, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)', 
            [name, description, address, city, zipcode, image, image_url])

        res.send({
            id: rows.insertId,
            name,
            description,
            address,
            city,
            zipcode, 
            image, 
            image_url
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while creating the supermarket'
        })
    }
}

/**
 * Deletes a specific entry from the market table
 * @async
 * @param {Request} req 
 * @param {Response} res 
 * @returns {CodecState} Code confirming a succsesful operation
 */
export const deleteMarket = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM supermarket WHERE id = ?', [req.params.id])
        if(result.affectedRows <= 0) return res.status(404).json({
            message: 'Supermarket not found'
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while deleting the supermarket'
        })
    }
}

/**
 * Updates an existing market entry
 * @async
 * @param {Request} req 
 * @param {Response} res 
 * @returns {JSON} Json containing the new information
 */
export const updateMarket = async (req, res) => {
    try {
        const {id} = req.params
        const {name, description, address, city, zipcode, image, image_url} = req.body

        const [result] = await pool.query(
            'UPDATE supermarket SET name = IFNULL(?, name), description = IFNULL(?, description), address = IFNULL(?, address), city = IFNULL(?, city), zipcode = IFNULL(?, zipcode), image = IFNULL(?, image), image_url = IFNULL(?, image_url) WHERE id = ?', 
            [name, description, address, city, zipcode, image, image_url, id])

        if(result.affectedRows === 0) return res.status(404).json({
            message: 'Supermarket not found'
        })

        const [rows] = await pool.query('SELECT * FROM supermarket WHERE id = ?', [id])
        res.json(rows);
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Something went wrong while updating the supermarket'
        })
    }
}