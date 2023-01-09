const Post = require('../../models/post');
const Comment = require('../../models/comment');


module.exports.addComment = async (req, res) => {
    try {
        
        let post = await Post.findById(req.params.id);
        if(!post){
            return res.status(401).json({
                message: 'post not exist'
            });
        }

        let comment = await Comment.create({
            input: req.body.input,
            user: req.user._id,
            post: post._id
        });

        // saving the id of comment to Post's comment array
        post.comments.push(comment._id);
        post.save();
        comment = await comment.populate('user', 'name email');

        return res.status(200).json({
            message: 'comment added!!',
            comment_id: comment._id
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}