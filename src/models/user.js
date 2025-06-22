import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING(50),
		allowNull: false,
		unique: true,
		validate: { isEmail: true },
	},
	password: {
		type: DataTypes.STRING(70),
		allowNull: false,
	},
	isActive: {
		type: DataTypes.TINYINT(1),
		allowNull: false,
		defaultValue: true,
	},
});

await User.sync();

export default User;
