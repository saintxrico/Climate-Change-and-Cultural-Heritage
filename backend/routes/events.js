const express = require('express');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const router = express.Router();
const prisma = new PrismaClient();

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Access denied' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};

router.post('/', authenticate, async (req, res) => {
  const { title, description, location, date } = req.body;
  const event = await prisma.event.create({
    data: { title, description, location, date: new Date(date), createdBy: req.user.id },
  });
  res.status(201).json(event);
});

router.get('/', async (req, res) => {
  const events = await prisma.event.findMany({ include: { creator: true, volunteers: { include: { user: true } } } });
  res.json(events);
});

router.post('/:id/volunteer', authenticate, async (req, res) => {
  const volunteer = await prisma.volunteer.create({
    data: { userId: req.user.id, eventId: req.params.id },
  });
  res.status(201).json(volunteer);
});

module.exports = router;