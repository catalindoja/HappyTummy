import {pool} from '../db.js'

export const getPayments = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM paymenthistory')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while retrieving the payments'
        })
    }
}

export const getPayment = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM paymenthistory WHERE id = ?', [req.params.id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while retrieving the payment'
        })
    }
}

export const createPayment = async (req, res) => {
    try {
        const {iduser, ammount, date, description} = req.body

        const [rows] = await pool.query(
            'INSERT INTO paymenthistory (iduser, ammount, date, description) VALUES (?, ?, ?, ?)', 
            [iduser, ammount, date, description])
        
        res.send({
            id: rows.insertId,
            iduser,
            ammount,
            date,
            description
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while creating the payment'
        })
    }
}

export const deletePayment = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM paymenthistory WHERE id = ?', [req.params.id])
        if(result.affectedRows <= 0) return res.status(404).json({
            message: 'Payment not found'
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while deleting the payment'
        })
    }
}

export const updatePayment = async (req, res) => {
    try {
        const {id} = req.params
        const {iduser, ammount, date, description} = req.body

        const [result] = 
            await pool.query('UPDATE paymenthistory SET ammount = IFNULL(?, ammount), date = IFNULL(?, date), description = IFNULL(?, description) WHERE id = ?', 
            [ammount, date, description, id])
        if(result.affectedRows === 0) return res.status(404).json({
            message: 'Payment not found'
        })

        const [rows] = await pool.query('SELECT * FROM paymenthistory WHERE id = ?', [id])
        res.json(rows);
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Something went wrong while updating the payment'
        })
    }
}