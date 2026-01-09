// import necessary modules
import express from 'express';
import pool from './src/config/db.js';
import userRoutes from './src/routes/userRouters.js';
import errorHandling from './src/middlewares/error-handling.js';
import createUserTable from './src/data/createUserTable.js';

const app = express();
const port = 3000;

// Middlewares
app.use(express.json());


// index page
app.get('/', (req,res) => {
  res.status(200).json({
    Message: 'Hello, World!',
    Note: 'The Index Page Works Fine'
  })
})


// Routes
app.use('/test', userRoutes);


// Error Handling Middleware
app.use(errorHandling);


// Testing postgres connection
app.get('/', async (req,res) => {
  const result = await pool.query('SELECT current_database()');
  res.send(`The current database name is: ${result.rows[0].current_database}`)
})


/* 
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});


app.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const result = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
    const message = result.rowCount === 0 ? 'User not found' : 'User created successfully';
    res.send(`${result.rows[0].id}th ${message}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const result = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *', [name, email, id]);
    const message = result.rowCount === 0 ? 'User not found' : 'User updated successfully';
    const data = {
      id: id,
      name: result.rows[0].name,
      email: result.rows[0].email,
      message: message
    }
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    const message = result.rowCount === 0 ? 'User not found' : 'User deleted successfully';
    const data = {
      id: id,
      name: result.rows[0].name,
      email: result.rows[0].email,
      message: message
    }
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});
 */


// table creation if not exist
createUserTable();

// Server Running
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});