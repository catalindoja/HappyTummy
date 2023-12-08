import {pool} from '../db.js'

/**
 * Recovers the users from the database
 * @async
 * @param {Request} req 
 * @param {Response} res 
 * @returns {JSON} JSON containg the recovered data
 */
export const getUsers = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM user')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while retrieving the users'
        })
    }
}

/**
 * Recovers a specific user from the database
 * @async
 * @param {Request} req 
 * @param {Response} res 
 * @returns {JSON} JSON containg the recovered data
 */
export const getUser = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM user WHERE id = ?', [req.params.id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while retrieving the user'
        })
    }
}

/**
 * Creates a new user entry
 * @async
 * @param {Request} req 
 * @param {Response} res 
 * @returns {JSON} JSON containg the newly created data
 */
export const createUser = async (req, res) => {
    try {
        const {idsupermarket, username, password, email, role, premium, image, image_url, age, gender, realname, realsurname, country} = req.body

        const [rows] = await pool.query(
            'INSERT INTO user (idsupermarket, username, password, email, role, premium, image, image_url, age, gender, realname, realsurname, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [idsupermarket, username, password, email, role, premium, image, image_url, age, gender, realname, realsurname, country])
                
        res.send({
            id: rows.insertId,
            idsupermarket,
            username,
            email,
            role,
            premium,
            image,
            image_url,
            age, 
            gender, 
            realname, 
            realsurname, 
            country
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while creating the user'
        })
    }
}

/**
 * Deletes a specific entry from the user table
 * @async
 * @param {Request} req 
 * @param {Response} res 
 * @returns {CodecState} Code confirming a succsesful operation
 */
export const deleteUser = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM user WHERE id = ?', [req.params.id])
        if(result.affectedRows <= 0) return res.status(404).json({
            message: 'User not found'
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong while deleting the user'
        })
    }
}

/**
 * Updates an existing user entry
 * @async
 * @param {Request} req 
 * @param {Response} res 
 * @returns {JSON} Json containing the new information
 */
export const updateUser = async (req, res) => {
    try {
        const {id} = req.params
        const {username, password, email, premium, image, image_url, age, gender, realname, realsurname, country} = req.body
        const [result] = 
            await pool.query('UPDATE user SET username = IFNULL(?, username), password = IFNULL(?, password), email = IFNULL(?, email), premium = IFNULL(?, premium), image = IFNULL(?, image), image_url = IFNULL(?, image_url), age = IFNULL(?, age), gender = IFNULL(?, gender), realname = IFNULL(?, realname), realsurname = IFNULL(?, realsurname), country = IFNULL(?, country) WHERE id = ?',
            [username, password, email, premium, image, image_url, age, gender, realname, realsurname, country, id])

        if(result.affectedRows === 0) return res.status(404).json({
            message: 'User not found'
        })

        const [rows] = await pool.query('SELECT * FROM user WHERE id = ?', [id])
        res.json(rows);
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Something went wrong while updating the user'
        })
    }
}