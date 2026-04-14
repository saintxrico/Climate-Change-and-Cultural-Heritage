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

router.get('/', async (req, res) => {
  const articles = await prisma.article.findMany({ include: { author: true } });
  res.json(articles);
});

router.post('/', authenticate, async (req, res) => {
  const { title, content } = req.body;
  const article = await prisma.article.create({
    data: { title, content, authorId: req.user.id },
  });
  res.status(201).json(article);
});

module.exports = router;