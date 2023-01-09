const Post = require('../../models/post');
const Like = require('../../models/like');



module.exports.likePost = async (req, res) => {
    try {
        
        let post = await Post.findById(req.params.id);
        if(!post){
            return res.status(401).json({
                message: 'post not exist'
            });
        }

        
        post = await Post.findById(req.params.id).populate('user', '-password ').populate({
            path: 'comments',
            populate: {
                path: 'user',
                select: '-password'
            }
        }).populate({
            path: 'likes',
            populate: {
                path: 'user',
                select: '-password'
            }
        });
        // console.log('post: ', post);
        let postLikedUser = post.likes;
        console.log('postLikedUser: ', postLikedUser);
        for(let user of postLikedUser){
            if(user.user.email === req.user.email){
                return res.status(200).json({
                    message: 'Post liked already!!'
                });
            }
        }

        let like = await Like.create({
            user: req.user._id
        });

        post.likes.push(like._id);
        await post.save();
        return res.status(200).json({
            message: 'Post liked!!',
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
        post = await Post.findById(req.params.id).populate('user', '-password ').populate({
            path: 'comments',
            populate: {
                path: 'user',
                select: '-password'
            }
        }).populate({
            path: 'likes',
            populate: {
                path: 'user',
                select: '-password'
            }
        });

        let deleteLike = await Like.findOneAndDelete({
            user: req.user._id
        });
        if(!deleteLike){
            return res.status(200).json({
                message: 'Like not exist!!'
            });
        }
        await post.likes.pull(deleteLike._id);
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