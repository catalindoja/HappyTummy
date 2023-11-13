import {pool} from '../db.js'


/**
 * Recovers the comments from the database
 * @async
 * @param {Request} req 
 * @param {Response} res 
 * @returns {JSON} JSON containg the recovered data
 */
export const getComments = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM comment')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while retrieving the comments'
        })
    }
}

/**
 * Recovers a specific comment from the database
 * @async
 * @param {Request} req 
 * @param {Response} res 
 * @returns {JSON} JSON containg the recovered data
 */
export const getComment = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM comment WHERE id = ?', [req.params.id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while retrieving the comment'
        })
    }
}

/**
 * Creates a new comment entry
 * @async
 * @param {Request} req 
 * @param {Response} res 
 * @returns {JSON} JSON containg the newly created data
 */
export const createComment = async (req, res) => {
    try {
        const {iduser, idproduct, content, likes, parentId} = req.body

        const [rows] = await pool.query(
            'INSERT INTO comment (iduser, idproduct, content, likes, parentId) VALUES (?, ?, ?, ?, ?)', 
            [iduser, idproduct, content, likes, parentId])

        res.send({
            id: rows.insertId,
            iduser,
            idproduct,
            content,
            likes,
            parentId
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while creating the comment'
        })
    }
}

/**
 * Deletes a specific entry from the comment table
 * @async
 * @param {Request} req 
 * @param {Response} res 
 * @returns {CodecState} Code confirming a succsesful operation
 */
export const deleteComment = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM comment WHERE id = ?', [req.params.id])
        if(result.affectedRows <= 0) return res.status(404).json({
            message: 'Comment not found'
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while deleting the comment'
        })
    }
}

/**
 * Updates an existing comment entry
 * @async
 * @param {Request} req 
 * @param {Response} res 
 * @returns {JSON} Json containing the new information
 */
export const updateComment = async (req, res) => {
    try {
        const {id} = req.params
        const {content, likes} = req.body

        const [result] = await pool.query(
            'UPDATE comment SET content = IFNULL(?, content), likes = IFNULL(?, likes) WHERE id = ?', 
            [content, likes, id])

        if(result.affectedRows === 0) return res.status(404).json({
            message: 'Comment not found'
        })

        const [rows] = await pool.query('SELECT * FROM comment WHERE id = ?', [id])
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while updating the comment'
        })
    }
}