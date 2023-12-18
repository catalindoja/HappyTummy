import {pool} from '../db.js'

export const getNotifications = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM notification')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while retrieving the notifications'
        })
    }
}

export const getNotification = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM notification WHERE id = ?', [req.params.id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while retrieving the notification'
        })
    }
}

export const createNotification = async (req, res) => {
    try {
        const {idReceiver, idComment, idRecipeComment, idErrorReport, content} = req.body

        const [rows] = await pool.query(
            'INSERT INTO notification (idReceiver, idComment, idRecipeComment, idErrorReport, content) VALUES (?, ?, ?, ?, ?)', 
            [idReceiver, idComment, idRecipeComment, idErrorReport, content])

        res.send({
            id: rows.insertId,
            idReceiver, 
            idComment, 
            idRecipeComment, 
            idErrorReport, 
            content
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Something went wrong while creating the notification'
        })
    }
}

export const deleteNotification = async (req, res) => {
    try {
        await pool.query('DELETE FROM notification WHERE id = ?', [req.params.id])
        res.json({message: 'Notification deleted successfully'})
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while deleting the notification'
        })
    }
}

export const updateNotification = async (req, res) => {
    try {
        const {id} = req.params
        const {content} = req.body

        const [result] = await pool.query(
            'UPDATE notification SET content = IFNULL(?, content) WHERE id = ?', 
            [content, id])

        if(result.affectedRows === 0) return res.status(404).json({
            message: 'Notification not found'
        })

        const [rows] = await pool.query('SELECT * FROM notification WHERE id = ?', [id])
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while updating the notification'
        })
    }
}