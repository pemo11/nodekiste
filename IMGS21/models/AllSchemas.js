// file: AllSchemas.js
// hat keine Funktion, dient nur dem leichtern Nachschauen

var FacultySchema = new Schema(
    {
        name: {type: String, required:true, maxLength:100},
        alias: String,
        city: String,
        country: String,
    }
)

var SyllabusSchema = new Schema(
    {
        title: {type: String, required:true, maxLength:100},
        alias: String,
        faculty: {type: Schema.Types.ObjectId, ref: "Faculty", required:true},
    }
)

var CourseSchema = new Schema(
    {
        title: {type: String, required:true, maxLength:100},
        description: String,
        alias: String,
        semester: String,
        syllabus: {type: Schema.Types.ObjectId, ref: "Syllabus", required:true},
    }
)

var HelperSchema = new Schema(
    {
        title: {type: String, required:true, maxLength:100},
        author: {type: String, required:true, maxLength:100},
        createDate: Date,
        creator: {type: Schema.Types.ObjectId, ref: "User", required:true},
        course: {type: Schema.Types.ObjectId, ref: "Course", required:true},
        type: { type: String, required:true, enum: ["YouTube", "Weblink", "Buch", "Sonstiges"],default:"Sonstiges"},
        comment: String,
        ratings: {type: Int, required:true},
    }
)

var UserSchema = new Schema(
    {
        name: {type: String, required:true, maxLength:100},
        email: {type: String, required:true, maxLength:100},
        password: {type: String, required:true, maxLength:100},
    }
)