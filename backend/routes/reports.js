const express = require('express');
const { PrismaClient } = require('@prisma/client');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const jwt = require('jsonwebtoken');

const router = express.Router();
const prisma = new PrismaClient();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ dest: 'uploads/' });

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

router.post('/', authenticate, upload.single('image'), async (req, res) => {
  const { title, description, type, latitude, longitude } = req.body;
  let imageUrl = null;
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path);
    imageUrl = result.secure_url;
  }
  const report = await prisma.report.create({
    data: { title, description, type, imageUrl, latitude: parseFloat(latitude), longitude: parseFloat(longitude), userId: req.user.id },
  });
  res.status(201).json(report);
});

router.get('/', async (req, res) => {
  const reports = await prisma.report.findMany({ include: { user: true, comments: true, likes: true } });
  res.json(reports);
});

router.get('/:id', async (req, res) => {
  const report = await prisma.report.findUnique({
    where: { id: req.params.id },
    include: { user: true, comments: { include: { user: true } }, likes: true },
  });
  res.json(report);
});

router.put('/:id/status', authenticate, async (req, res) => {
  if (req.user.role !== 'officer' && req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  const { status } = req.body;
  const report = await prisma.report.update({
    where: { id: req.params.id },
    data: { status },
  });
  res.json(report);
});

router.delete('/:id', authenticate, async (req, res) => {
  const report = await prisma.report.findUnique({ where: { id: req.params.id } });
  if (report.userId !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  await prisma.report.delete({ where: { id: req.params.id } });
  res.json({ message: 'Report deleted' });
});

module.exports = router;