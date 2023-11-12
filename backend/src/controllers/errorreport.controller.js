import {pool} from '../db.js'

export const getErrorReports = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM errorReport')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while retrieving the errorreports'
        })
    }
}

export const getErrorReport = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM errorReport WHERE id = ?', [req.params.id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while retrieving the errorreport'
        })
    }
}

export const createErrorReport = async (req, res) => {
    try {
        const {idProduct, content} = req.body

        const [rows] = await pool.query(
            'INSERT INTO errorReport (idProduct, content) VALUES (?, ?)', 
            [idProduct, content])

        res.send({
            id: rows.insertId,
            idProduct,
            content
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Something went wrong while creating the error report'
        })
    }
}

export const deleteErrorReport = async (req, res) => {
    try {
        await pool.query('DELETE FROM errorReport WHERE id = ?', [req.params.id])
        res.json({message: 'Error report deleted successfully'})
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while deleting the error report'
        })
    }
}

export const updateErrorReport = async (req, res) => {
    try {
        const {id} = req.params
        const {content} = req.body

        const [result] = await pool.query(
            'UPDATE errorReport SET content = IFNULL(?, content) WHERE id = ?', 
            [content, id])

        if(result.affectedRows === 0) return res.status(404).json({
            message: 'Comment report not found'
        })

        const [rows] = await pool.query('SELECT * FROM errorReport WHERE id = ?', [id])
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while updating the error report'
        })
    }
}