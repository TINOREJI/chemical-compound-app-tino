const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const sequelize = require('../config/database');
const Compound = require('../models/compound-schema')(sequelize);

// Validation middleware
const validateCompound = [
  check('name').notEmpty().withMessage('Name is required'),
  check('image').notEmpty().withMessage('Image URL is required'),
  check('description').notEmpty().withMessage('Description is required'),
];

// GET paginated compounds
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  try {
    const compounds = await Compound.findAll({ limit, offset });
    const total = await Compound.count();
    res.json({ compounds, total });
  } catch (err) {
    console.error('GET /compounds error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET single compound
router.get('/:id', async (req, res) => {
  try {
    const compound = await Compound.findByPk(req.params.id);
    if (!compound) return res.status(404).json({ error: 'Compound not found' });
    res.json(compound);
  } catch (err) {
    console.error('GET /compounds/:id error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST new compound
router.post('/', validateCompound, async (req, res) => {
  //console.log('POST /compounds new data added:', req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation errors:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { name, image, description } = req.body; // Restrict fields
    const compound = await Compound.create({ name, image, description });
    res.status(201).json(compound);
  } catch (err) {
    console.error('Error creating compound:', err);
    res.status(500).json({ error: 'Failed to create compound' });
  }
});

// PUT update compound
router.put('/:id', validateCompound, async (req, res) => {
  //console.log('PUT /compounds/:id updated data:', req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation errors:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const compound = await Compound.findByPk(req.params.id);
    if (!compound) return res.status(404).json({ error: 'Compound not found' });
    const { name, image, description } = req.body; // Restrict fields
    await compound.update({ name, image, description });
    res.json(compound);
  } catch (err) {
    console.error('Error updating compound:', err);
    res.status(500).json({ error: 'Failed to update compound' });
  }
});

// DELETE compound
router.delete('/:id', async (req, res) => {
  //console.log('DELETE /compounds/:id data deleted:', req.params.id);
  try {
    const compound = await Compound.findByPk(req.params.id);
    if (!compound) return res.status(404).json({ error: 'Compound not found' });
    await compound.destroy();
    res.status(204).send(); // Standard 204 for DELETE
  } catch (err) {
    console.error('Error deleting compound:', err);
    res.status(500).json({ error: 'Failed to delete compound' });
  }
});

module.exports = router;