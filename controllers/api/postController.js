const Post = require('../../models/post');

module.exports.createPost = async (req, res) => {
    try {
        let post = await Post.create({
            title: req.body.title,
            description: req.body.description,
            user: req.user._id
        });

        return res.status(200).json({
            post: {
                post_id: post._id,
                title: post.title,
                description: post.description,
                created_at: post.createdAt
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}