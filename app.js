import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import initDB from './db.js';
import userRoutes from './src/routes/user.route.js';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use('/user', userRoutes);

initDB().then(() => {
	app.listen(PORT, () => {
		console.log(`Servidor corriendo en http://localhost:${PORT}`);
	});
});
