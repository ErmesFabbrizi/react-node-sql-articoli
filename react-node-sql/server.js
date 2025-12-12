// server.js
require('dotenv').config(); // legge le variabili da .env
const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Configurazione database usando variabili d'ambiente
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true, // necessario se il server richiede crittografia
        trustServerCertificate: true // utile per certificato autofirmato
    }
};

// Endpoint per leggere articoli (da vista)
app.get('/articoli', async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .query('SELECT * FROM vw_MiaVistaArticoli');
        res.json(result.recordset);
    } catch (err) {
        console.error('ERRORE SQL:', err);
        res.status(500).send('Errore server');
    }
});

// Endpoint di test
app.get('/', (req, res) => {
    res.send('Server attivo e funzionante!');
});

// Avvio server
const PORT = 5001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server avviato su http://0.0.0.0:${PORT}`);
});
