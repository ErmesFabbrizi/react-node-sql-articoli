# 📝 React Node SQL Articoli

Progetto **fullstack** per gestire e visualizzare articoli, con frontend in **React**, backend in **Node.js/Express** e database **SQL Server**.  
Include ricerca, ordinamento, paginazione e badge prezzo dinamici. 💻✨

---

## 🛠 Tecnologie utilizzate

- **Frontend:** React ⚛️, Bootstrap 🎨, Bootstrap Icons  
- **Backend:** Node.js 🟢, Express 🚀, MSSQL 🗄️  
- **Database:** SQL Server 🛢️  
- **Altro:** CORS 🌐, dotenv 🔒  

---

## 📂 Struttura del progetto

```
root/
├─ react-frontend/        # Frontend React ⚛️
├─ react-node-sql/        # Backend Node + SQL 🟢
│  ├─ server.js
│  ├─ db.sql              # Script creazione tabelle e vista 🗄️
│  └─ .env                # Variabili ambiente 🔒
└─ README.md              # Questo file 📄
```

---

## 🗄 Database

Il progetto utilizza **SQL Server**.  
Per evitare di caricare dati sensibili su GitHub, nel repository è incluso **`db.sql`**, che contiene:

- La tabella `Articoli` 📦  
- La vista `vw_MiaVistaArticoli` 👀  
- Esempi opzionali di dati di test (commentati) 🧪

### db.sql

```sql
-- Creazione tabella articoli
CREATE TABLE Articoli (
    CODICEARTICOLO VARCHAR(50) NOT NULL PRIMARY KEY,
    DESCRIZIONEARTICOLO VARCHAR(255) NOT NULL,
    UM1 VARCHAR(10),
    UM2 VARCHAR(10),
    PREZZOUNITARIO DECIMAL(10,2) DEFAULT 0
);

-- Creazione vista
CREATE VIEW vw_MiaVistaArticoli AS
SELECT CODICEARTICOLO, DESCRIZIONEARTICOLO, UM1, UM2, PREZZOUNITARIO
FROM Articoli;
```

---

## ⚙️ Configurazione Backend

1. Posizionarsi nella cartella `react-node-sql` 📂  
2. Creare un file `.env` con le variabili ambiente 🔒:

```
DB_USER=nome_utente_sql
DB_PASSWORD=password_sql
DB_SERVER=nome_server_sql
DB_DATABASE=log_rp
PORT=5001
```

3. Installare le dipendenze:

```bash
npm install
```

4. Avviare il server:

```bash
node server.js
```

Il server sarà disponibile su `http://localhost:5001` 🌐

---

## ⚛️ Configurazione Frontend

1. Posizionarsi nella cartella `react-frontend` 📂  
2. Installare le dipendenze:

```bash
npm install
```

3. Avviare il frontend:

```bash
npm start
```

Il frontend sarà disponibile su `http://localhost:3000` 🌐

---

## 🚀 Funzionalità principali

- Visualizzazione lista articoli in tabella 📋  
- Ordinamento per codice, descrizione e prezzo 🔀  
- Ricerca per codice o descrizione 🔍  
- Paginazione con numeri di pagina chiari e funzionali 🔢  
- Badge prezzo dinamici con tooltip (“Basso”, “Medio”, “Alto”) 💰  
- Modal centrato con dettagli articolo al click 🖱️  

---

## 📦 GitHub

- Non includere dati reali o sensibili nel repository ❌  
- Includere solo strutture tabelle e vista (`db.sql`) ✅  
- Aggiungere `.gitignore` per `node_modules`, `.env` e build del frontend  

### Esempio .gitignore

```
# Node modules
react-node-sql/node_modules/
react-frontend/node_modules/

# Environment variables
react-node-sql/.env

# Build
react-frontend/build/
```

---

## 📝 Licenza

Puoi usare questo progetto come esempio o base per altri progetti fullstack. 🎉
