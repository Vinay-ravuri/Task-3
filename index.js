const express = require('express');
const app = express();
const bookRoutes = require('./books');

app.use(express.json()); // Middleware to parse JSON bodies

app.use('/books', bookRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
