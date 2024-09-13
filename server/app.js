import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Importa cors
import userRoutes from './routes/userRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import sequelize from './config/db.js';

dotenv.config();

const app = express();

// Configura CORS para permitir solicitudes desde cualquier origen (opcional)
app.use(cors());

// Alternativamente, configura CORS para permitir solo el origen específico (ejemplo para localhost:5173)
// app.use(cors({ origin: 'http://localhost:5173' }));

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/skills', skillRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
  // Conectar a la base de datos
  sequelize.authenticate().then(() => {
    console.log('Conectado a la base de datos PostgreSQL');
  }).catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });
});
