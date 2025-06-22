import sequelize from './src/config/database.js';

const initDB = async () => {
	try {
		await sequelize.authenticate();
		console.log('Conexión a MySQL establecida.');
		await sequelize.sync();
	} catch (err) {
		console.error('Error al conectar a la base de datos:', err);
	}
};

export default initDB;
