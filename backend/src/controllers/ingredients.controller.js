import {pool} from '../db.js'

/**
 * Recovers the ingredients from the database
 * @async
 * @param {Request} req 
 * @param {Response} res 
 * @returns {JSON} JSON containg the recovered data
 */
export const getIngredients = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM ingredients')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while retrieving the ingredients'
        })
    }
}

/**
 * Recovers a specific ingredient from the database
 * @async
 * @param {Request} req 
 * @param {Response} res 
 * @returns {JSON} JSON containg the recovered data
 */
export const getIngredient = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM ingredients WHERE id = ?', [req.params.id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while retrieving the ingredient'
        })
    }
}

/**
 * Creates a new ingredient entry
 * @async
 * @param {Request} req 
 * @param {Response} res 
 * @returns {JSON} JSON containg the newly created data
 */
export const createIngredient = async (req, res) => {
    try {
        const {idproduct, idrecipe, quantity, measurementunit} = req.body

        const [rows] = await pool.query(
            'INSERT INTO ingredients (idproduct, idrecipe, quantity, measurementunit) VALUES (?, ?, ?, ?)', 
            [idproduct, idrecipe, quantity, measurementunit])

        res.send({
            id: rows.insertId,
            idproduct,
            idrecipe,
            quantity,
            measurementunit
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while creating the ingredient'
        })
    }
}

/**
 * Deletes a specific entry from the ingredient table
 * @async
 * @param {Request} req 
 * @param {Response} res 
 * @returns {CodecState} Code confirming a succsesful operation
 */
export const deleteIngredient = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM ingredients WHERE id = ?', [req.params.id])
        if(result.affectedRows <= 0) return res.status(404).json({
            message: 'Ingredient not found'
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while deleting the ingredient'
        })
    }
}

/**
 * Updates an existing ingredient entry
 * @async
 * @param {Request} req 
 * @param {Response} res 
 * @returns {JSON} Json containing the new information
 */
export const updateIngredient = async (req, res) => {
    try {
        const {id} = req.params
        const {idproduct, idrecipe, quantity, measurementunit} = req.body

        const [result] = await pool.query(
            'UPDATE ingredients SET idproduct = IFNULL(?, idproduct), idrecipe = IFNULL(?, idrecipe), quantity = IFNULL(?, quantity), measurementunit = IFNULL(?, measurementunit) WHERE id = ?', 
            [idproduct, idrecipe, quantity, measurementunit, id])

        if(result.affectedRows === 0) return res.status(404).json({
            message: 'Ingredient not found'
        })

        const [rows] = await pool.query('SELECT * FROM ingredients WHERE id = ?', [id])
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while updating the ingredient'
        })
    }
}