import {pool} from '../db.js'

export const getUserAllergies = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM userAllergies')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while retrieving the userallergies'
        })
    }
}

export const getUserAllergy = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM userAllergies WHERE iduser = ? AND idallergy = ?', [req.params.iduser, req.params.idallergy])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while retrieving the userallergy'
        })
    }
}

export const createUserAllergy = async (req, res) => {
    try {
        const {iduser, idallergy} = req.body

        const [rows] = await pool.query(
            'INSERT INTO userAllergies (iduser, idallergy) VALUES (?, ?)', 
            [iduser, idallergy])

        res.send({
            id: rows.insertId,
            iduser,
            idallergy
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Something went wrong while creating the user allergy'
        })
    }
}

export const deleteUserAllergy = async (req, res) => {
    try {
        await pool.query('DELETE FROM userAllergies WHERE iduser = ? AND idallergy = ?', [req.params.iduser, req.params.idallergy])
        res.json({message: 'User allergy deleted successfully'})
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while deleting the user allergy'
        })
    }
}