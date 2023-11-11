const { Schema, model } = require ("mongoose");

const userSchema = new Schema( {
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.|\..+/, "Must match and email address"]

    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ]
})