'use strict';

const knex = require('../knex');

/*
let searchTerm = 'Hello';
knex
  .select('notes.id', 'title', 'content')
  .from('notes')
  .modify(queryBuilder => {
    if (searchTerm) {
      queryBuilder.where('title', 'like', `%${searchTerm}%`);
    }
  })
  .orderBy('notes.id')
  .then(results => {
    console.log(JSON.stringify(results, null, 2));
  })
  .catch(err => {
    console.error(err);
  });
*/

/*
// Get Note By Id accepts an ID. It returns the note as an object note an array  
let searchTerm = 3;
knex
  .select()
  .from('notes')
  .where({ 'id': searchTerm })
  .then(results => {
    console.log(JSON.stringify(results[0], null, 2));
  });
*/

/*
// Update Note By Id accepts and ID and an object with the desired updates. It returns the updated note as an object
let searchTerm = 3;

knex('notes')
  .select()
  .where({ 'id': searchTerm })
  .update({ 'title': 'WHAT THE FU-' })
  .returning(['id', 'title'])
  .then(results => {
    console.log(JSON.stringify(results[0], null, 2));
  });
*/

/*
// Create a Note accepts an object with the note properties and inserts it in the DB. It returns the new note(including the new id) as an object
knex('notes')
  .insert([{
    title: 'Create a Note AHHH',
    content: 'AHHHhhhhHHH Real Monsters'
  }])
  .returning(['id', 'title', 'content'])
  .then(results => {
    console.log(JSON.stringify(results[0], null, 2));
  });
*/

/*
let searchTerm = 3;
// Delete Note By Id accepts an ID and deletes the note from the DB
knex('notes')
  .select()
  .where({ 'id': searchTerm })
  .del()
  .then(results => {
    console.log(JSON.stringify(results, null, 2));
  });
*/

const noteId = 99;
const result = [34, 56, 78].map(tagId => ({ note_id: noteId, tag_id: tagId }));
console.log(`insert: ${JSON.stringify(result)} into notes_tags`);