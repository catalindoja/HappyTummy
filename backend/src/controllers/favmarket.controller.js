import {pool} from '../db.js'

export const getFavMarkets = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM favMarket')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while retrieving the favmarkets'
        })
    }
}

export const getFavMarket = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM favMarket WHERE iduser = ? AND idmarket = ?', [req.params.iduser, req.params.idmarket])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while retrieving the favmarket'
        })
    }
}

export const createFavMarket = async (req, res) => {
    try {
        const {iduser, idmarket} = req.body

        const [rows] = await pool.query(
            'INSERT INTO favMarket (iduser, idmarket) VALUES (?, ?)', 
            [iduser, idmarket])

        res.send({
            id: rows.insertId,
            iduser,
            idmarket
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Something went wrong while creating the fav market'
        })
    }
}

export const deleteFavMarket = async (req, res) => {
    try {
        await pool.query('DELETE FROM favMarket WHERE iduser = ? AND idmarket = ?', [req.params.iduser, req.params.idmarket])
        res.json({message: 'Fav market deleted successfully'})
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while deleting the fav market'
        })
    }
}