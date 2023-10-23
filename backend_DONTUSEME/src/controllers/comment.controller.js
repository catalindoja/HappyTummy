import {pool} from '../db.js'

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

export const createComment = async (req, res) => {
    try {
        const {iduser, idproduct, content, likes} = req.body

        const [rows] = await pool.query(
            'INSERT INTO comment (iduser, idproduct, content, likes) VALUES (?, ?, ?, ?)', 
            [iduser, idproduct, content, likes])

        res.send({
            id: rows.insertId,
            iduser,
            idproduct,
            content,
            likes
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while creating the comment'
        })
    }
}

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