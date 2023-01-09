const Post = require('../../models/post');



module.exports.likePost = async (req, res) => {
    try {
        
        let post = await Post.findById(req.params.id);
        if(!post){
            return res.status(401).json({
                message: 'post not exist'
            });
        }
        let postLikesUserId = post.likes;
        for(let userId of postLikesUserId){
            if(userId === req.user._id){
                return res.status(201).json({
                    message: 'Post liked already'
                });
            }
        }
        post.likes.push(req.user._id);
        await post.save();
        return res.status(200).json({
            message: 'Post liked!!'
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}


module.exports.unLikePost = async (req, res) => {
    try {
        
        let post = await Post.findById(req.params.id);
        if(!post){
            return res.status(401).json({
                message: 'post not exist'
            });
        }
        let postLikesUserId = post.likes;
        postLikesUserId = postLikesUserId.filter((userId) => {
            return userId !== req.user._id;
        });
        post.likes = postLikesUserId;
        await post.save();
        return res.status(200).json({
            message: 'Post unliked!!'
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}