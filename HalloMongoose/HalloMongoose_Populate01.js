// file: HalloMongoose_Populate01.js

// Ein Beispiel fehlt noch
// https://www.geeksforgeeks.org/how-to-populate-virtuals-to-a-mongoose-model-using-node-js/
// Requiring module
const mongoose = require('mongoose');

// Connecting to database
mongoose.connect('mongodb://localhost:27017/GFG',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	});

// User Schema
const userSchema = new mongoose.Schema({
	username: String,
	email: String
})

// Post Schema
const postSchema = new mongoose.Schema({
	title: String,
	postedBy: mongoose.Schema.Types.ObjectId
})

// Creating and populating virtual property 'user' in postSchema
// will populate the documents from user collection if
// their '_id' matches with the 'postedBy' of the post
postSchema.virtual('user', {
	ref: 'User',
	localField: 'postedBy', // Of post collection
	foreignField: '_id', // Of user collection
	justOne: true
})

// Creating user and post models
const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);

// Function to create a post by the user
const createPost = async (next) => {
	const user = await User.findOne({ _id: '60acfa48e82a52560c32ec0a' });

	const newPost = new Post({
		title: 'Post 1',
		postedBy: user._id
	})

	const postSaved = await newPost.save();
	console.log("post created");

	// The findPost will be called after the post is created
	next();
}

// Function to find the post and show the virtual property
const findPost = async () => {
	const post = await Post.findOne().populate('user');
	console.log(post.user);
}

// Creating the post then showing the virtual property on console
createPost(findPost);
