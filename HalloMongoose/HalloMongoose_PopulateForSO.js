// Example for populate not populating a virtual field
// hat sich von alleine geklärt (wie sooft hätte ich mich mit der Frage etwas blamiert)
// bei arrow-functions gibt es kein this!

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/TestDb2",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
        useFindAndModify:true
	});

// User Schema
const userSchema = new mongoose.Schema({
	username: String,
	email: String
})
.set("toObject", {virtuals: true},"toJSON", {virtuals: true});

userSchema.virtual("upn")
.get( () => {
    // Problem: Bei einer Arrow-Function gibt es kein this!
    return "upn=" + this.username + ":" + this.email;
});
    
// Post Schema
const postSchema = new mongoose.Schema({
	title: String,
	postedBy: mongoose.Schema.Types.ObjectId
})

postSchema.virtual("user", {
	ref: "User",
	localField: "postedBy", 	// Aus der post collection
	foreignField: "_id", 		// Aus der user collection
	justOne: true
})

// user und post model anlegen
const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

// get all posts
const findPost = async () => {
    Post
	.find()
	.populate("user")
    .exec((err, posts) => {
        console.log(posts[0].user);
        posts.forEach(post => {
            console.log(`Titel: ${post.title} User: ${post.user.upn}`);
        });
        mongoose.disconnect();
    });
}

findPost();

