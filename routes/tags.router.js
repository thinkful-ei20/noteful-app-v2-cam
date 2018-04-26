'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

// Get all tags
router.get('/tags', (req, res, next) => {

  knex
    .select()
    .from('tags')
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

// Get by Id
router.get('/tags/:id', (req, res, next) => {
  const { id } = req.params;

  knex('tags')
    .select()
    .where({ 'tags.id': id })
    .then(item => {
      if (item.length === 0) {
        res.status(404);
        next();
      } else {
        res.json(item[0]);
      }
    })
    .catch(err => {
      next(err);
    });
});

// Put update a tag
router.put('/tags/:id', (req, res, next) => {
  const id  = req.params.id;

  /* Never trust users - validate input */
  const updateObj = {};
  const updateableFields = ['id', 'name'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  /***** Never trust users - validate input *****/
  if (!updateObj.name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

  knex('tags')
    .select()
    .where({ 'id': id })
    .update(updateObj)
    .returning(['id', 'name'])
    .then(item => {
      if (item) {
        res.json(item);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});

/* ===== POST/CREATE ITEM ===== */
router.post('/tags', (req, res, next) => {
  const { name } = req.body;

  /* NEVER TRUST USERS. VALIDATE INPUT */
  if (!name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

  const newItem = { name };

  knex.insert(newItem)
    .into('tags')
    .returning(['id', 'name'])
    .then(result => {
      res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
    })
    .catch(err => next(err));

});

// DELETE
router.delete('/tags/:id', (req, res, next) => {
  const id = req.params.id;

  knex('tags')
    .select()
    .where({ 'id': id })
    .del()
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;