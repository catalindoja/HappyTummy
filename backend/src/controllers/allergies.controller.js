import {pool} from '../db.js'

/**
 * Recovers the allergies from the database
 * @async
 * @param {Request} req 
 * @param {Response} res 
 * @returns {JSON} JSON containg the recovered data
 */
export const getAllergies = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM allergies')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while retrieving the allergies'
        })
    }
}

/**
 * Recovers a specific allergy from the database
 * @async
 * @param {Request} req 
 * @param {Response} res 
 * @returns {JSON} JSON containg the recovered data
 */
export const getAllergy = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM allergies WHERE id = ?', [req.params.id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while retrieving the allergy'
        })
    }
}

/**
 * Creates a new allergy entry
 * @async
 * @param {Request} req 
 * @param {Response} res 
 * @returns {JSON} JSON containg the newly created data
 */
export const createAllergy = async (req, res) => {
    try {
        const {allergy_name, allergy_description} = req.body

        const [rows] = await pool.query(
            'INSERT INTO allergies (allergy_name, allergy_description) VALUES (?, ?)', 
            [allergy_name, allergy_description])

        res.send({
            id: rows.insertId,
            allergy_name,
            allergy_description
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while creating the allergy'
        })
    }
}

/**
 * Deletes a specific entry from the allergy table
 * @async
 * @param {Request} req 
 * @param {Response} res 
 * @returns {CodecState} Code confirming a succsesful operation
 */
export const deleteAllergy = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM allergies WHERE id = ?', [req.params.id])
        if(result.affectedRows <= 0) return res.status(404).json({
            message: 'Allergy not found'
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Cannot delete the allergy because it is used in a product'
        })
    }
}

/**
 * Updates an existing allergy entry
 * @async
 * @param {Request} req 
 * @param {Response} res 
 * @returns {JSON} Json containing the new information
 */
export const updateAllergy = async (req, res) => {
    try {
        const {id} = req.params
        const {allergy_name, allergy_description} = req.body
        const [result] = await pool.query('UPDATE allergies SET allergy_name = IFNULL(?, allergy_name), allergy_description = IFNULL(?, allergy_description) WHERE id = ?', [allergy_name, allergy_description, id])
        if(result.affectedRows === 0) return res.status(404).json({
            message: 'Allergy not found'
        })
        
        const [rows] = await pool.query('SELECT * FROM allergies WHERE id = ?', [id])
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while updating the allergy'
        })
    }
}