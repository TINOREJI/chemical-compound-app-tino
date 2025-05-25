const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const sequelize = require('../config/database');
const Compound = require('../models/compound-schema')(sequelize);

// GET paginated compounds of size 10 per page
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  try {
    const compounds = await Compound.findAll({ limit, offset });
    const total = await Compound.count();
    res.json({ compounds, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single compound based on ID
router.get('/:id', async (req, res) => {
  try {
    const compound = await Compound.findByPk(req.params.id);
    if (!compound) return res.status(404).json({ error: 'Compound not found' });
    res.json(compound);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new compound for creation of new compound
router.post('/', [
  check('name').notEmpty().withMessage('Name is required'),
  check('image').notEmpty().withMessage('Image URL is required'),
  check('description').notEmpty().withMessage('Description is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const compound = await Compound.create(req.body);
    res.status(201).json(compound);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update compound for updating existing compound using ID
router.put('/:id', [
  check('name').notEmpty().withMessage('Name is required'),
  check('image').notEmpty().withMessage('Image URL is required'),
  check('description').notEmpty().withMessage('Description is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const compound = await Compound.findByPk(req.params.id);
    if (!compound) return res.status(404).json({ error: 'Compound not found' });
    await compound.update(req.body);
    res.json(compound);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE compound for deleting existing compound using ID
router.delete('/:id', async (req, res) => {
  try {
    const compound = await Compound.findByPk(req.params.id);
    if (!compound) return res.status(404).json({ error: 'Compound not found' });
    await compound.destroy();
    res.json({ message: 'Compound deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;