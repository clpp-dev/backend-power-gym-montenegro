const express = require('express');
const router = express.Router();
const {
  getMembresias,
  getMembresiaById,
  createMembresia,
  updateMembresia,
  deleteMembresia
} = require('../controllers/membresiaController');

router.route('/')
  .get(getMembresias)
  .post(createMembresia);

router.route('/:id')
  .get(getMembresiaById)
  .put(updateMembresia)
  .delete(deleteMembresia);

module.exports = router;
