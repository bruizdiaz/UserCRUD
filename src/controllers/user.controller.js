import User from '../models/user.models.js';
import dotenv from 'dotenv';
import {
	validatePassword,
	validateEmail,
	validateName,
	hashPassword,
} from '../validators/users.validator.js';

dotenv.config();

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
	try {
		const users = await User.findAll({
			attributes: { exclude: ['password'] },
		});
		res.json(users);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Obtener un usuario por ID
export const getUserByID = async (req, res) => {
	res.json(req.user);
};

// Crear un nuevo usuario
export const createUser = async (req, res) => {
	try {
		const { password } = req.body;
		const name = (req.body.name || '').trim();
		const email = (req.body.email || '').trim();
		const errors = [];

		if (!name || !email || !password)
			errors.push({ message: 'Nombre, email y contraseña son requeridos' });

		if (!validateName(name))
			errors.push({
				message: 'Nombre inválido. Solo letras y espacios, mínimo 2 caracteres.',
			});

		if (name.length > 50)
			errors.push({ message: 'El nombre es demasiado largo (max. 50 caracteres).' });

		if (email.length > 100)
			errors.push({ message: 'El email es demasiado largo (max. 100 caracteres).' });

		if (!validateEmail(email)) errors.push({ message: 'Email invalido.' });

		if (password === name || password === email)
			errors.push({ message: 'La contraseña no puede ser igual al nombre o email.' });

		if (!validatePassword(password))
			errors.push({
				message:
					'La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos.',
			});

		if (errors.length > 0) return res.status(400).json({ errors });

		const existingUser = await User.findOne({ where: { email: email } });
		if (existingUser)
			return res.status(400).json({ message: 'El email ya se encuentra registrado.' });

		const hashedPassword = await hashPassword(password);

		const newUser = {
			name: name,
			email: email,
			password: hashedPassword,
		};

		const user = await User.create(newUser);
		res.status(201).json({
			id: user.id,
			name: user.name,
			email: user.email,
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Actualizar usuario
export const updateUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		const user = req.user;

		if (email && email !== user.email) {
			if (!validateEmail(email)) {
				return res
					.status(400)
					.json({ message: 'El formato del nuevo email es inválido.' });
			}
			const existingUser = await User.findOne({ where: { email: email } });
			if (existingUser && existingUser.id !== user.id) {
				return res
					.status(400)
					.json({ message: 'El email ya está en uso por otra cuenta.' });
			}
			user.email = email;
		}

		if (password) {
			if (!validatePassword(password)) {
				return res.status(400).json({
					message: 'La nueva contraseña no cumple los requisitos de seguridad.',
				});
			}
			user.password = await hashPassword(password);
		}

		if (name) {
			if (!validateName(name)) {
				return res
					.status(400)
					.json({ message: 'El nuevo nombre tiene un formato inválido.' });
			}
			user.name = name;
		}

		await user.save();
		res.json({ message: `Usuario ${user.id} actualizado correctamente.` });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Eliminar usuario
export const deleteUser = async (req, res) => {
	try {
		await req.user.destroy();
		res.json({ message: 'Usuario eliminado' });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
