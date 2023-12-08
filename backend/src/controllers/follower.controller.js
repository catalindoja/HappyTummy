import {pool} from '../db.js'

export const getFollowers = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM follower')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while retrieving the followers'
        })
    }
}

export const getFollower = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM follower WHERE id = ?', [req.params.id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while retrieving the follower'
        })
    }
}

export const createFollower = async (req, res) => {
    try {
        const {idFollowed, idFollower, dateFollowing} = req.body

        const [rows] = await pool.query(
            'INSERT INTO follower (idFollowed, idFollower, dateFollowing) VALUES (?, ?, ?)', 
            [idFollowed, idFollower, dateFollowing])

        res.send({
            id: rows.insertId,
            idFollowed, 
            idFollower, 
            dateFollowing
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Something went wrong while creating the follower'
        })
    }
}

export const deleteFollower = async (req, res) => {
    try {
        await pool.query('DELETE FROM follower WHERE id = ?', [req.params.id])
        res.json({message: 'Follower deleted successfully'})
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while deleting the follower'
        })
    }
}

export const updateFollower = async (req, res) => {
    try {
        const {id} = req.params.id
        const {dateFollowing} = req.body

        const [result] = await pool.query(
            'UPDATE follower SET dateFollowing = IFNULL(?, dateFollowing) WHERE id = ?', 
            [dateFollowing, id])

        if(result.affectedRows === 0) return res.status(404).json({
            message: 'Follower not found'
        })

        const [rows] = await pool.query('SELECT * FROM follower WHERE id = ?', [id])
        res.json(rows)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Something went wrong while updating the follower'
        })
    }
}