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

// Update folder the noteful
// The noteful app does not use this endpoint but we'll create it in order to round out our API
router.put('/folders/:id', (req, res, next) => {
  const id = req.params.id;

  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateableFields = ['name'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  /***** Never trust users - validate input *****/
  if (!updateObj.name) {
    const err = new Error('Missing `field` in request body');
    err.status = 400;
    return next(err);
  }

  knex('folders')
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

// Create a Folder accepts an object with a name and inserts it in the DB. Returns the new item along with the new ID.
router.post('/folders', (req, res, next) => {
  const { name } = req.body;

  const newFolder = { name };

  /***** Never trust users - validate input *****/
  if (!newFolder.name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

  knex('folders')
    .insert([{ name }])
    .returning(['id', 'name'])
    .then(item => {
      if (item) {
        res.location(`http://${req.headers.host}/folders/${item.id}`).status(201).json(item);
      }
    })
    .catch(err => {
      next(err);
    });
});

// Delete  Folder by Id accepts an ID and deletes the folder from the DB and then returns a 204 status
router.delete('/folders/:id', (req, res, next) => {
  const id = req.params.id;

  knex('folders')
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