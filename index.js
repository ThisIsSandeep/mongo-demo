const mongoose = require('mongoose');

mongoose
  .connect(
    'mongodb://localhost/playground',
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('Connected to MongoDB...');
  })
  .catch(err => console.error('Could not connect to MongoDB..', err.message));

// Schema (related to mongoose) Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});
