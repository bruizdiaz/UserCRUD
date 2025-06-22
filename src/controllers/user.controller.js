import User from '../models/user.js';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

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

export const getUserByID = async (req, res) => {
	res.json(req.user);
};

export const createUser = async (req, res) => {
	try {
		const { password } = req.body;
		const name = (req.body.name || '').trim();
		const email = (req.body.email || '').trim();
		const errors = [];

		if (!name || !email || !password) {
			errors.push({
				message: 'Nombre, email y contraseña son requeridas',
			});
		}

		const nameRegex = /^[a-zA-Z\s]{2,50}$/;
		if (!nameRegex.test(name)) {
			errors.push({
				message: 'Nombre inválido. Solo letras y espacios, mínimo 2 caracteres.',
			});
		}

		if (name.length > 50) {
			errors.push({
				message: 'El nombre es demasiado largo (max. 50 caracteres).',
			});
		}

		if (email.length > 100) {
			errors.push({
				message: 'El email es demasiado largo (max. 100 caracteres).',
			});
		}

		if (password === name || password === email) {
			errors.push({ message: 'La contraseña no puede ser igual al nombre o email.' });
		}

		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
		if (!passwordRegex.test(password)) {
			errors.push({
				message:
					'La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos.',
			});
		}

		const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
		if (email === '' || !emailRegex.test(email)) {
			errors.push({
				message: 'Email invalido.',
			});
		}

		const existingUser = await User.findOne({ where: { email: email } });
		if (existingUser) {
			// No uses un array aquí, ya que es un error que detiene todo.
			return res.status(400).json({ message: 'El email ya se encuentra registrado.' });
		}

		if (errors.length > 0) {
			return res.status(400).json({ errors });
		}

		//PASSWORD HASH
		const saltRounds = Number(process.env.SALT_ROUNDS);
		const hashedPassword = await bcrypt.hash(password, saltRounds);

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

export const updateUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		const user = req.user;

		if (email && email !== user.email) {
			const existingUser = await User.findOne({ where: { email: email } });
			if (existingUser && existingUser.id !== user.id) {
				return res
					.status(400)
					.json({ message: 'El email ya está en uso por otra cuenta.' });
			}
			user.email = email;
		}

		if (password) {
			const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
			if (!passwordRegex.test(password)) {
				return res.status(400).json({
					message: 'La nueva contraseña no cumple los requisitos de seguridad.',
				});
			}
			const saltRounds = Number(process.env.SALT_ROUNDS);
			user.password = await bcrypt.hash(password, saltRounds);
		}

		user.name = name || user.name;

		await user.save();
		res.json({ message: `Usuario ${user.id} actualizado correctamente.` });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const deleteUser = async (req, res) => {
	try {
		await req.user.destroy();
		res.json({ message: 'Usuario eliminado' });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
