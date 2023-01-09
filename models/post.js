const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        // connecting with the user schema
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: [
        {
            type: String
        }
    ]
},{
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;