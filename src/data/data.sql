-- Create table if doesn't exist
CREATE TABLE IF NOT EXISTS users (
    id SEREAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
    created_at TIMESTAMP DEFAULT NOW()
)

-- Check if table exists
SELECT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'users'
)