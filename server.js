require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a MySQL usando la variable de entorno DATABASE_URL
const pool = mysql.createPool(process.env.DATABASE_URL);

app.use(express.static('public'));
app.use(express.json());

// Obtener tareas desde MySQL
app.get('/api/tareas', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tareas ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Guardar una nueva tarea en MySQL
app.post('/api/tareas', async (req, res) => {
  try {
    const { titulo } = req.body;
    const [result] = await pool.query(
      'INSERT INTO tareas (titulo) VALUES (?)',
      [titulo]
    );
    res.json({ id: result.insertId, titulo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});