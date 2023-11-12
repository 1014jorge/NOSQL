const { Schema, model } = require("mongoose");

const userSchema = new Schema({
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
        match: [/.+@.+\..+/, "Must match and email address"]

    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Thought",
        }
    ],
    friends: [
        {
            type: Schema.Types > ObjectId,
            ref: "User",

        }
    ]
},
    {
        toJSON: {
            virtuals: true
        },
        id: false,
    }
);

userSchema.virtual("friendCount").get(function () {
    return this.friends.lenght;
})

const User = model("User", userSchema);

module.exports = User;