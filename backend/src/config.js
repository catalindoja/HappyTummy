import {config} from 'dotenv'

config()
//Backend port
export const PORT = process.env.PORT || 4000
//Database host address
export const DB_HOST = process.env.DB_HOST || 'localhost'
//Database port
export const DB_PORT = process.env.DB_PORT || 3307
//Database user
export const DB_USER = process.env.DB_USER || 'root'
//Database user password
export const DB_PASSWORD = process.env.DB_PASSWORD || 'usbw'
//Database name
export const DB_DATABASE = process.env.DB_DATABASE || 'happytummy'