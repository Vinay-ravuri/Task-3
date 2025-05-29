const express = require('express');
const router = express.Router();

// In-memory array of books
let books = [
  { id: 1, title: 'The Alchemist', author: 'Paulo Coelho' },
  { id: 2, title: '1984', author: 'George Orwell' }
];

// GET /books - Get all books
router.get('/', (req, res) => {
  res.json(books);
});

// POST /books - Add a new book
router.post('/', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ message: 'Title and author are required' });
  }
  const newBook = {
    id: books.length ? books[books.length - 1].id + 1 : 1,
    title,
    author
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT /books/:id - Update a book by ID
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author } = req.body;

  const book = books.find(b => b.id === id);
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }
  if (!title || !author) {
    return res.status(400).json({ message: 'Title and author are required' });
  }

  book.title = title;
  book.author = author;
  res.json(book);
});

// DELETE /books/:id - Delete a book by ID
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }

  books.splice(index, 1);
  res.json({ message: 'Book deleted successfully' });
});

module.exports = router;
