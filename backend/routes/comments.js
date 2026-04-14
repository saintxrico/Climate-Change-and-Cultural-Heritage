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
  const { content, reportId } = req.body;
  const comment = await prisma.comment.create({
    data: { content, userId: req.user.id, reportId },
  });
  res.status(201).json(comment);
});

router.get('/:reportId', async (req, res) => {
  const comments = await prisma.comment.findMany({
    where: { reportId: req.params.reportId },
    include: { user: true },
  });
  res.json(comments);
});

module.exports = router;