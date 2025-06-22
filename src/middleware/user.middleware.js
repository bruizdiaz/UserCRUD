import User from '../models/user.js';

export const findUserById = async (req, res, next) => {
	try {
		const user = await User.findByPk(req.params.id);
		if (!user) {
			return res.status(404).json({ message: 'Usuario no encontrado' });
		}
		req.user = user;
		next();
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
