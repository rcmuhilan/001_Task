import pool from '../config/db.js';

const createUserTable = async () => {
    // Check if table exists
    const checkTableExists = `
    SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'users'
    )`;
    
    try {
        const tableCheck = await pool.query(checkTableExists);
        const tableExists = tableCheck.rows[0].exists;
        
        if (!tableExists) {
            const queryText = `
            CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            created_at TIMESTAMP DEFAULT NOW()
            )`;
            
            await pool.query(queryText);
            console.log("User Table Created Successfully");
        } else {
            console.log("User Table Already Exists");
        }
    } catch (err) {
        console.log("Error Creating User Table: ", err);
    }
};

export default createUserTable;