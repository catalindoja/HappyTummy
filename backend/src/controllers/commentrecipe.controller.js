import {pool} from '../db.js'

export const getCommentRecipes = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM commentRecipe')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while retrieving the commentrecipes'
        })
    }
}

export const getCommentRecipe = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM commentRecipe WHERE id = ?', [req.params.id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while retrieving the commentrecipe'
        })
    }
}

export const createCommentRecipe = async (req, res) => {
    try {
        const {iduser, idrecipe, content, likes, idparent} = req.body

        const [rows] = await pool.query(
            'INSERT INTO commentRecipe (iduser, idrecipe, content, likes, idparent) VALUES (?, ?, ?, ?, ?)', 
            [iduser, idrecipe, content, likes, idparent])

        res.send({
            id: rows.insertId,
            iduser,
            idrecipe,
            content,
            likes,
            idparent
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Something went wrong while creating the recipe comment'
        })
    }
}

export const deleteCommentRecipe = async (req, res) => {
    try {
        await pool.query('DELETE FROM commentRecipe WHERE id = ?', [req.params.id])
        res.json({message: 'Recipe comment deleted successfully'})
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while deleting the recipe comment'
        })
    }
}

export const updateCommentRecipe = async (req, res) => {
    try {
        const {id} = req.params
        const {content, likes} = req.body

        const [result] = await pool.query(
            'UPDATE commentRecipe SET content = IFNULL(?, content), likes = IFNULL(?, likes) WHERE id = ?', 
            [content, likes, id])

        if(result.affectedRows === 0) return res.status(404).json({
            message: 'Comment not found'
        })

        const [rows] = await pool.query('SELECT * FROM commentRecipe WHERE id = ?', [id])
        res.json(rows)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Something went wrong while updating the recipe comment'
        })
    }
}