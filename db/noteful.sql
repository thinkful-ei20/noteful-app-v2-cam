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