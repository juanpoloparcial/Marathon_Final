import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { signToken } from '../utils/jwt.js';
import { requireAuth } from '../middleware/auth.js';
import User from '../models/User.js';

const router = Router();

router.post('/register', async (req, res) => {
  const { nombre, apellido, email, contrasenia } = req.body;
  if (!email || !contrasenia) return res.status(400).json({ error: 'Email y contraseña requeridos' });
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ error: 'Email ya registrado' });
    const passwordHash = await bcrypt.hash(contrasenia, 10);
    const user = await User.create({ nombre: nombre || '', apellido: apellido || '', email, passwordHash, role: 'user' });
    return res.status(201).json({ id: user._id, email: user.email, role: user.role });
  } catch (e) {
    return res.status(500).json({ error: 'Error registrando usuario' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'Credenciales inválidas' });
  const token = signToken({ sub: user._id.toString(), role: user.role, email: user.email });
  return res.json({ token, user: { id: user._id, email: user.email, role: user.role, nombre: user.nombre, apellido: user.apellido, avatar: user.avatar } });
});

router.get('/me', requireAuth, async (req, res) => {
  const user = await User.findById(req.user.sub);
  if (!user) return res.status(404).json({ error: 'No encontrado' });
  res.json({ id: user._id, email: user.email, role: user.role, nombre: user.nombre, apellido: user.apellido, avatar: user.avatar });
});

export default router;
