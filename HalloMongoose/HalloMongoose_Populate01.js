// file: HalloMongoose_Populate01.js
// Abfrage eines Schema, das mit einem zweiten Schema "verwandt" ist

// https://www.geeksforgeeks.org/how-to-populate-virtuals-to-a-mongoose-model-using-node-js/

const mongoose = require("mongoose");

// Verbindung zur Datenbank herstellen
mongoose.connect("mongodb://localhost:27017/TestDb2",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

// Das User Schema wird definiert
const userSchema = new mongoose.Schema({
	username: String,
	email: String
})

// Das Post Schema wird definiert
const postSchema = new mongoose.Schema({
	title: String,
	postedBy: mongoose.Schema.Types.ObjectId
})

// Das Post-Schema erhölt eine virtuelle Eigenschaft User
// Werden Documents abgerufen, wird die Eigenschaft mit dem Wert aus Users gefüllt, der 
// über die postedBy-Property im Post-Schema zugeordnet wird
postSchema.virtual("user", {
	ref: "User",
	localField: "postedBy", 	// Aus der post collection
	foreignField: "_id", 		// Aus der user collection
	justOne: true
})

// user und post model anlegen
const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

// neuen user anlegen
userNeu = new User({
	username: "Pemo",
	email: "pemo@superhost.xx"
});

const createUser = async (next) => {
	const user = await userNeu.save();
	console.log("user created");
}

// createUser();

const userId = "60bf1c95c2a7fa350470bf9a";

// Post anlegen, der dem User mit userId zugeordnet ist
const createPost = async (next) => {
	const user = await User.findOne({ _id: userId});
	const newPost = new Post({
		title: "Post Neu",
		postedBy: user._id
	})

	const postSaved = await newPost.save();
	console.log("Der neue Post wurde angelegt...");

	// Damit wird findPost() automatisch aufgerufen!
	next();
}

// Alle Posts auflisten und ausgeben
const findPost = async () => {
	// const post = await Post.findOne().populate("user");
	const posts = await Post.find().populate("user");
	posts.forEach(post => {
		console.log(`Titel: ${post.title} User: ${post.user.username}`);
	});
	mongoose.disconnect();
}

// Post anlegen und alle Posts ausgeben
createPost(findPost);

