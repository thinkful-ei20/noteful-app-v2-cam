DROP TABLE IF EXISTS folders;

CREATE TABLE folders (
  id serial PRIMARY KEY,
  name text NOT NULL
);

ALTER SEQUENCE folders_id_seq RESTART WITH 100;

INSERT INTO folders (name) VALUES
  ('Archive'),
  ('Drafts'),
  ('Personal'),
  ('Work');

DROP TABLE IF EXISTS notes;

CREATE TABLE notes (
  id serial PRIMARY KEY,
  title text NOT NULL,
  content text,
  created timestamp DEFAULT now(),
  folder_id int REFERENCES folders(id) ON DELETE SET NULL
);

INSERT INTO notes (title, content, folder_id) VALUES
  (
    '5 life lessons learned from cats',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
    100
  );

/*
-- get all notes with folders
SELECT * FROM notes
INNER JOIN folders ON notes.folder_id = folders.id;

-- get all notes, show folders if they exists otherwise null
SELECT * FROM notes
LEFT JOIN folders ON notes.folder_id = folders.id;

-- get all notes, show folders if they exists otherwise null
SELECT * FROM notes
LEFT JOIN folders ON notes.folder_id = folders.id
WHERE notes.id = 1005;
*/

DROP TABLE IF EXISTS tags;

CREATE TABLE tags (
  id serial PRIMARY KEY,
  name text NOT NULL
)

INSERT INTO tags (name) VALUES
('It'),
('Is'),
('Too'),
('Early');

DROP TABLE IF EXISTS notes_tags;

CREATE TABLE notes_tags (
  note_id INTEGER NOT NULL REFERENCES notes ON DELETE CASCADE,
  tag_id INTEGER NOT NULL REFERENCES tags ON DELETE CASCADE
);

INSERT INTO notes_tags (note_id, tag_id) VALUES
(1, 1),
(4, 2),
(5, 3);

SELECT title, tags.name, folders.name FROM notes
LEFT JOIN folders ON notes.folder_id = folders.id
LEFT JOIN notes_tags ON notes.id = notes_tags.note_id
LEFT JOIN tags ON notes_tags.tag_id = tags.id;

SELECT title, tags.name, folders.name FROM notes
INNER JOIN folders ON notes.folder_id = folders.id
INNER JOIN notes_tags ON notes.id = notes_tags.note_id
INNER JOIN tags ON notes_tags.tag_id = tags.id;