const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();

const DB_URI = process.env.DB_URI;
const SERVER_URL = process.env.SERVER_URL;
const PORT = process.env.PORT;

app.use(cors());

const userRoutes = require('./routes/users.routes'); 
const profileRoutes = require('./routes/profiles.routes');
const threadRoutes = require('./routes/threads.routes');
const postRoutes = require('./routes/posts.routes');
const postPreviewRoutes = require('./routes/post_previews.routes');
const commentsRoutes = require('./routes/comments.routes');

app.use(express.static(path.join(__dirname, '../build')));
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/threads', threadRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/post-previews', postPreviewRoutes);
app.use('/api/comments', commentsRoutes);

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

mongoose.connect(DB_URI).then(() => {
  console.log('Connected to database');
  app.listen(PORT, () => console.log('Server is running on port', PORT));
}).catch((err) => {
  console.log(err);
  process.exit(1);
});