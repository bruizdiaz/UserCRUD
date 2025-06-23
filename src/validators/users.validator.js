import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

// --- EXPRESIONES ---
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const NAME_REGEX = /^[a-zA-Z\s]{2,50}$/;

// --- VALIDACIÓN ---

export const validatePassword = (password) => {
	return PASSWORD_REGEX.test(password);
};

export const validateEmail = (email) => {
	return EMAIL_REGEX.test(email);
};

export const validateName = (name) => {
	return NAME_REGEX.test(name);
};

// --- HASHING ---

export const hashPassword = async (password) => {
	const saltRounds = Number(process.env.SALT_ROUNDS); // Usar 10 como valor por defecto seguro
	const hashedPassword = await bcrypt.hash(password, saltRounds);
	return hashedPassword;
};
