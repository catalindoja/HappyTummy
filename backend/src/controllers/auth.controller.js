import { pool, db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * Recovers the users from the database
 * @async
 * @param {Request} req 
 * @param {Response} res 
 * @returns {JSON} JSON containg the recovered data
 */
export const justinfo = async (req, res) => {
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
 * Registers a new user after checking it doesn't already exist
 * @param {Request} req 
 * @param {Response} res 
 * @returns {JSON} JSON containing the new user's data
 */
export const register = (req, res) => {
  console.log("REGISTER");

  //CHECK EXISTING USER
  const q = "SELECT * FROM user WHERE email = ? OR username = ?";

  db.query(q, [req.body.email, req.body.username], (err, data) => {
    console.log("REGISTER!");
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");

    //Hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO user(`idsupermarket`,`username`,`email`,`password`,`role`,`premium`,) VALUES (?)";
    const values = [req.body.idsupermarket, req.body.username, req.body.email, hash, req.body.role, req.body.premium];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    });
  });
};

/**
 * Asynchronously registers a new user after checking it doesn't already exist
 * @async
 * @param {Request} req 
 * @param {Response} res 
 * @returns {JSON} JSON containing the new user's data
 */
export const registerAsync = async (req, res) => {
  try{
    const {idsupermarket, username, email, password, role, premium, age, gender, realname, realsurname, country } = req.body;
    const [checkExistingUser] = await pool.query('SELECT * FROM user WHERE email = ? OR username = ?', [email, username])
    if(checkExistingUser.length) return res.status(409).json('User already exists!')

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const [result] = await pool.query( 'INSERT INTO user (idsupermarket, username, email, password, role, premium, age, gender, realname, realsurname, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
    [idsupermarket, username, email, hash, role, premium, age, gender, realname, realsurname, country])

    res.send({
        id: result.insertId,
        idsupermarket,
        username,
        email,
        role,
        premium,
        age,
        gender,
        realname,
        realsurname,
        country
    })
  } catch(error){
    return res.status(500).json({
      message: 'Something went wrong while creating the user'
    })
  } 
}

/**
 * Checks that the user exists and the password is correct, and logs the user is
 * @param {Request} req 
 * @param {Response} res 
 * @returns {Response} 200 response
 */
export const login = async (req, res) => {
  console.log("LOGIN");

  //CHECK USER
  const q = "SELECT * FROM user WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    console.log("CHECK!");
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    //Check password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password,
    );

    if (!isPasswordCorrect){
      return res.status(400).json("Wrong username or password!");
    }

    const token = jwt.sign({ id: data[0].id }, "jwtkey");
    const { password, ...other } = data[0];
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};

/**
 * Asynchronously checks that the user exists and the password is correct, and logs the user is
 * @async
 * @param {Request} req 
 * @param {Response} res 
 * @returns {Response} 200 response
 */
export const loginAsync = async (req, res) => {
  try{
    const { username, password } = req.body;
    const [rows] = await pool.query('SELECT * FROM user WHERE username = ?', [username])
    if(rows.length === 0) return res.status(404).json('User not found!')

    const isPasswordCorrect = bcrypt.compareSync(password, rows[0].password)
    if(!isPasswordCorrect) return res.status(400).json('Wrong username or password!')

    const token = jwt.sign({ id: rows[0].id }, "jwtkey");
    const { password:pass, ...other } = rows[0];
    res
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite:"none",
        secure:true
      })
      .status(200)
      .json(other);
  } catch(error){
    return res.status(500).json({
      message: 'Something went wrong while logging in'
    })
  } 
}

/**
 * Des loggege al usuari
 * @param {Request} req 
 * @param {Response} res 
 * @returns {Response} 200 response
 */
export const logout = (req, res) => {
  res.clearCookie("access_token",{
    sameSite:"none",
    secure:true
  }).status(200).json("User has been logged out.")
};

export const checkExistingUserByMail = async (req, res) => {
  try{
    const [rows] = await pool.query('SELECT * FROM user WHERE email = ?', [req.body.email])
    if(rows.length) return res.status(409).json('User already exists!')
    else return res.status(200).json('User does not exist')
  } catch(error){
    return res.status(500).json({
      message: 'Something went wrong while retrieving the users'
    })
  } 
}


export const getUserEncryptedPassword = async (req, res) => {

  try{
    const salt = bcrypt.genSaltSync(10);
    const hash = req.body.password = bcrypt.hashSync(req.body.password, salt);
    return res.status(200).json(hash)
  } catch(error){
    return res.status(500).json({
      message: 'Something went wrong while retrieving the encrypted password'
    })
  } 
}