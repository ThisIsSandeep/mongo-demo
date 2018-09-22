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

// To use our schema definition, we need to convert our courseSchema into a Model we can work with. To do so, we pass it into mongoose.model(modelName, schema):
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  const course = new Course({
    name: 'JavaScript Course',
    author: 'Sandeep',
    tags: ['vanilla', 'es6'],
    isPublished: true
  });
  // save is a async function which return a promise so we need to use await and wrap it to async function
  const result = await course.save();
  console.log(result);
}

async function getCourses() {
  const courses = await Course.find({ isPublished: true })
    .limit(2)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}

getCourses();
