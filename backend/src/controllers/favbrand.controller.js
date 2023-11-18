import {pool} from '../db.js'

export const getFavBrands = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM favBrand')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while retrieving the favbrands'
        })
    }
}

export const getFavBrand = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM favBrand WHERE iduser = ? AND idbrand = ?', [req.params.iduser, req.params.idbrand])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while retrieving the favbrand'
        })
    }
}

export const createFavBrand = async (req, res) => {
    try {
        const {iduser, idbrand} = req.body

        const [rows] = await pool.query(
            'INSERT INTO favBrand (iduser, idbrand) VALUES (?, ?)', 
            [iduser, idbrand])

        res.send({
            id: rows.insertId,
            iduser,
            idbrand
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Something went wrong while creating the fav brand'
        })
    }
}

export const deleteFavBrand = async (req, res) => {
    try {
        await pool.query('DELETE FROM favBrand WHERE iduser = ? AND idbrand = ?', [req.params.iduser, req.params.idbrand])
        res.json({message: 'Fav brand deleted successfully'})
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while deleting the fav brand'
        })
    }
}