import 'dotenv/config.js';
import __dirname from './utils.js';
import express from 'express';
import path from 'path';
import logger from 'morgan';
import indexRouter from './routes/index.js';
import errorHandler from './middlewares/errorHandler.js';
import notFoundHandler from './middlewares/notFoundHandler.js'
import cors from 'cors';

//import mongoose from 'mongoose'; // <-- agregado por Emi


let app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Bloque codigo Lilo
/*
app.use(cors({
  origin: 'http://encuestapp.com',
  credentials: true
}));
*/
//fin bloque codigo Lilo

//Bloque codigo Emi
//Modificacion mas generalizada de CORS
// Permitir solicitudes desde localhost y desde el dominio de producción
const allowedOrigins = [
  "http://localhost:5173",  // para desarrollo local
  "http://encuestapp.local.cloud" // para producción local con Ingress
];

app.use(cors({
  origin: function (origin, callback) {
    // Permitir requests sin origen (como curl o Postman) o desde origenes válidos
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("No autorizado por CORS"));
    }
  },
  credentials: true,
}));

//fin configuración CORS -->codigo Emi

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);

// Catch-all para React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(notFoundHandler);

app.use(errorHandler);


// Conexión MongoDB <-- Agregador por Emi
/*mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch((err) => console.error("❌ Error al conectar con MongoDB:", err));
*/
export default app;
