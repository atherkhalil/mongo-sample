# Mongo DB Sample Code

This is some sample Mongo DB code in a simple Rest API, which has basic CRUD endpoints to refer to as a guide.

## Installation

To run this sample code, install the npm packages & run the server.js file.

```bash
npm install
```

```bash
node server
```

## Getting Started With Mongo DB

### Model

First define a 'model' of the document you are going to store in the database, in the form of JSON in a JS file (`Post.js` in our case). This model is the structure of the document to be stored in the database.

```javascript
const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Posts", PostSchema);
```

Note that we are using `mongoose` library to interact with Mongo DB.
To import the 'Post' model use the following code.

```javascript
const Post = require("./models/Post");
```

### Connect to Mongo DB

Next, we'll connect with Mongo DB using the credentials provided when creating a cluster (database).

```javascript
// Connecting to the database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected!");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
connectDB();
```

### Performing CRUD Operations

#### Get all the records

The following function returns all the records in the Posts model

```javascript
await Post.find();
```

#### Get a record by `Id`

To get a record by `Id`, just pass the `Id` in the `findById()` function.

```javascript
await Post.findById(req.params.id);
```

#### Add a new Post to the database

Add a new Post by passing the data as per the model defined earlier. Note that `post.save()` function has to be called whenever a new `post` is to be saved to the database.

```javascript
const post = new Post({
  title: req.body.title,
  desc: req.body.desc,
});
const savedPost = await post.save();
```

#### Update a Post in the database

To update a post, first you need to pass in the `Id` by which the post is identified and then it is updated by using the `$set` flag.

```javascript
await Post.updateOne(
  { _id: req.body.id },
  {
    $set: {
      desc: req.body.desc,
    },
  }
);
```

#### Delete a Post from the database

To delete a post, simply pass the `Id` to the `remove()` function.

```javascript
await Post.remove({ _id: req.params.id });
```
