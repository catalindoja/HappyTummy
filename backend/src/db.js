import { createPool } from "mysql2/promise";

// Create connection
export const pool = createPool({
    host: "localhost",
    user: "root",
    password: "usbw",
    port: "3307",
    database: "happytummy",
  });