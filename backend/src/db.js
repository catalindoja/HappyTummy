import { createPool } from "mysql2/promise";
import mysql from "mysql"

import { 
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD,
    DB_DATABASE
} from './config.js'

console.log("*****************************")
console.log("DB_HOST: " + DB_HOST)
console.log("DB_PORT: " + DB_PORT)
console.log("DB_USER: " + DB_USER)
console.log("DB_PASSWORD: " + DB_PASSWORD)
console.log("DB_DATABASE: " + DB_DATABASE)
console.log("DB_HOST: " + DB_HOST)
console.log("*****************************") 

// Create connection
export const pool = createPool({  
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    database: DB_DATABASE,
  });

// Create mysql conection
export const db = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    database: DB_DATABASE,
})
