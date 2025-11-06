import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/auth.js';
import User from '../models/User.js';

const router = Router();

// Superadmin: list users
router.get('/', requireAuth, requireRole('superadmin'), async (req, res) => {
  const list = await User.find({}).select('_id email role nombre apellido createdAt');
  res.json(list.map(u => ({ id: u._id, email: u.email, role: u.role, nombre: u.nombre, apellido: u.apellido, createdAt: u.createdAt })));
});

// Superadmin: change role
router.patch('/:id/role', requireAuth, requireRole('superadmin'), async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  if (!['user', 'admin', 'superadmin'].includes(role)) return res.status(400).json({ error: 'Rol inválido' });
  const user = await User.findByIdAndUpdate(id, { role }, { new: true });
  if (!user) return res.status(404).json({ error: 'No encontrado' });
  res.json({ id: user._id, role: user.role });
});

// Superadmin: delete user
router.delete('/:id', requireAuth, requireRole('superadmin'), async (req, res) => {
  const { id } = req.params;
  const removed = await User.findByIdAndDelete(id);
  if (!removed) return res.status(404).json({ error: 'No encontrado' });
  res.json({ id: removed._id });
});

export default router;
