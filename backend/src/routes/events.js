import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/auth.js';
import Event from '../models/Event.js';
import Enrollment from '../models/Enrollment.js';

const router = Router();

// Public: list events
router.get('/', async (req, res) => {
  const list = await Event.find({}).sort({ date: 1 });
  res.json(list);
});

// Registered: enroll/unenroll
router.post('/:eventId/enroll', requireAuth, async (req, res) => {
  const { eventId } = req.params;
  const ev = await Event.findById(eventId);
  if (!ev) return res.status(404).json({ error: 'Evento no encontrado' });
  try {
    const en = await Enrollment.create({ userId: req.user.sub, eventId });
    res.status(201).json(en);
  } catch (e) {
    if (e.code === 11000) return res.status(409).json({ error: 'Ya inscripto' });
    res.status(500).json({ error: 'Error inscribiendo' });
  }
});

router.delete('/:eventId/enroll', requireAuth, async (req, res) => {
  const { eventId } = req.params;
  const removed = await Enrollment.findOneAndDelete({ userId: req.user.sub, eventId });
  if (!removed) return res.status(404).json({ error: 'No inscripto' });
  res.json(removed);
});

// Admin: CRUD events
router.post('/', requireAuth, requireRole('admin', 'superadmin'), async (req, res) => {
  try {
    const ev = await Event.create(req.body);
    res.status(201).json(ev);
  } catch (e) {
    res.status(400).json({ error: 'Error creando evento' });
  }
});

router.put('/:id', requireAuth, requireRole('admin', 'superadmin'), async (req, res) => {
  const { id } = req.params;
  const updated = await Event.findByIdAndUpdate(id, req.body, { new: true });
  if (!updated) return res.status(404).json({ error: 'No encontrado' });
  res.json(updated);
});

router.delete('/:id', requireAuth, requireRole('admin', 'superadmin'), async (req, res) => {
  const { id } = req.params;
  const removed = await Event.findByIdAndDelete(id);
  if (!removed) return res.status(404).json({ error: 'No encontrado' });
  await Enrollment.deleteMany({ eventId: id });
  res.json(removed);
});

export default router;
