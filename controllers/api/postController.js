const Post = require('../../models/post');

module.exports.createPost = async (req, res) => {
    try {
        let post = await Post.create({
            title: req.body.title,
            description: req.body.description,
            user: req.user._id
        });

        await post.populate('user', '-password');

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


module.exports.deletePost = async (req, res) => {
    try {
        let post = await Post.findById(req.params.id);
        if(!post){
            return res.status(401).json({
                message: 'Invalid id'
            });
        }

        await post.populate('user', '-password');
        if(post.user.email !== req.user.email){
            return res.status(401).json({
                message: 'Unauthorized access'
            });
        }

        await Post.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message: 'Post deleted!!'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}


