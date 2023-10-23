import {pool} from '../db.js'

export const getRecipes = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM recipe')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while retrieving the recipes'
        })
    }
}

export const getRecipe = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM recipe WHERE id = ?', [req.params.id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while retrieving the recipe'
        })
    }
}

export const createRecipe = async (req, res) => {
    try {
        const {idproduct, iduser, description, likes, time, unit, ammountofpeople} = req.body

        const [rows] = await pool.query(
            'INSERT INTO recipe (idproduct, iduser, description, likes, time, unit, ammountofpeople) VALUES (?, ?, ?, ?, ?, ?, ?)', 
            [idproduct, iduser, description, likes, time, unit, ammountofpeople])

        res.send({
            id: rows.insertId,
            idproduct,
            iduser,
            description,
            likes,
            time,
            unit,
            ammountofpeople
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while creating the recipe'
        })
    }
}

export const deleteRecipe = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM recipe WHERE id = ?', [req.params.id])
        if(result.affectedRows <= 0) return res.status(404).json({
            message: 'Recipe not found'
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while deleting the recipe'
        })
    }
}

export const updateRecipe = async (req, res) => {
    try {
        const {id} = req.params
        const {idproduct, iduser, description, likes, time, unit, ammountofpeople} = req.body

        const [result] = await pool.query(
            'UPDATE recipe SET idproduct = IFNULL(?, idproduct), iduser = IFNULL(?, iduser), description = IFNULL(?, description), likes = IFNULL(?, likes), time = IFNULL(?, time), unit = IFNULL(?, unit), ammountofpeople = IFNULL(?, ammountofpeople) WHERE id = ?', 
            [idproduct, iduser, description, likes, time, unit, ammountofpeople, id])

        if(result.affectedRows === 0) return res.status(404).json({
            message: 'Recipe not found'
        })

        const [rows] = await pool.query('SELECT * FROM recipe WHERE id = ?', [id])
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while updating the recipe'
        })
    }
}