'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');


// Get all folders
router.get('/folders', (req, res, next) => {
  const id = req.params.id;

  knex
    .select('id', 'name')
    .from('folders')
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});

// Get Folder by Id
router.get('/folders/:id', (req, res, next) => {
  const id = req.params.id;

  knex
    .select('id', 'name')
    .where({ 'id': id })
    .from('folders')
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});





module.exports = router;