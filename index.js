const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory book list
let books = [
  { id: 1, title: "Atomic Habits", author: "James Clear" },
  { id: 2, title: "The Alchemist", author: "Paulo Coelho" }
];


app.get('/', (req, res) => {
  res.send('Welcome to the Book API!');
});


// GET /books - Get all books
app.get('/books', (req, res) => {
  res.json(books);
});

// POST /books - Add a new book
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  const newBook = {
    id: books.length + 1,
    title,
    author
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT /books/:id - Update a book by ID
app.put('/books/:id', (req, res) => {
  const { id } = req.params;
  const { title, author } = req.body;
  const book = books.find(b => b.id === parseInt(id));

  if (!book) return res.status(404).json({ message: 'Book not found' });

  book.title = title || book.title;
  book.author = author || book.author;

  res.json(book);
});

// DELETE /books/:id - Remove a book by ID
app.delete('/books/:id', (req, res) => {
  const { id } = req.params;
  const index = books.findIndex(b => b.id === parseInt(id));

  if (index === -1) return res.status(404).json({ message: 'Book not found' });

  const removedBook = books.splice(index, 1);
  res.json({ message: 'Book deleted', book: removedBook[0] });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
