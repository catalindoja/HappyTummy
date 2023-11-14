import {pool} from '../db.js'

export const getCommentReports = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM commentReport')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while retrieving the commentreports'
        })
    }
}

export const getCommentReport = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM commentReport WHERE id = ?', [req.params.id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while retrieving the commentreport'
        })
    }
}

export const createCommentReport = async (req, res) => {
    try {
        const {iduser, content, idComment} = req.body

        const [rows] = await pool.query(
            'INSERT INTO commentReport (iduser, content, idComment) VALUES (?, ?, ?)', 
            [iduser, content, idComment])

        res.send({
            id: rows.insertId,
            iduser,
            content,
            idComment
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Something went wrong while creating the comment report'
        })
    }
}

export const deleteCommentReport = async (req, res) => {
    try {
        await pool.query('DELETE FROM commentReport WHERE id = ?', [req.params.id])
        res.json({message: 'Comment report deleted successfully'})
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while deleting the comment report'
        })
    }
}

export const updateCommentReport = async (req, res) => {
    try {
        const {id} = req.params
        const {content} = req.body

        const [result] = await pool.query(
            'UPDATE commentReport SET content = IFNULL(?, content) WHERE id = ?', 
            [ content, id])

        if(result.affectedRows === 0) return res.status(404).json({
            message: 'Comment report not found'
        })

        const [rows] = await pool.query('SELECT * FROM commentReport WHERE id = ?', [id])
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while updating the comment report'
        })
    }
}