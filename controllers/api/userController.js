const jwt = require('jsonwebtoken');
const User = require('../../models/user');
require('dotenv').config();




module.exports.home = (req, res) => {
    return res.status(200).json({
        message: 'running'
    });
}


module.exports.createUser = async (req, res) => {
    try {
        let user = await User.findOne({email: req.body.email});
        console.log('user: ', user);
        if(!user){
            user = await User.create(req.body);
            console.log('user: ', user);
        }
        return res.status(200).json({
            user: {
                user: user
            }
        });    
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error'
        });       
    }
}

module.exports.authenticateUser = async (req, res) => {
    try {
        if(req.body.email && req.body.password){
            let user = await User.findOne({email: req.body.email});
            if(user && user.password === req.body.password){
                return res.status(200).json({
                    message: 'successfully authenticated the user',
                    jwt: {
                        token: jwt.sign(user.toJSON(), process.env.JWTSECRETKEY)
                    }
                });
            }
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}


module.exports.followUser = async (req, res) => {
    try {

        let userToBeFollow = await User.findById(req.params.id);
        if(!userToBeFollow){
            return res.status(401).json({
                message: 'Incorrect id'
            });
        }
    
    
        if(req.user._id === req.params.id){
            return res.status(401).json({
                message: 'user cannot follow itself'
            });
        }
    
    
        let authenticatedUser = await User.findById(req.user._id);
        let followingUser = authenticatedUser.following;
        for(let user of followingUser){
            if(user === req.params.id){
                return res.status(200).json({
                    message: 'user exist in the followed list'
                });
            }
        }
        authenticatedUser.following.push(req.params.id);
        await authenticatedUser.save();

        userToBeFollow.followers.push(req.user._id);
        await userToBeFollow.save();
    
        
        return res.status(200).json({
            message: 'user followed successfully'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error'
        });
    }

    
}


module.exports.unfollowUser = async (req, res) => {
    try {

        let userToBeFollow = await User.findById(req.params.id);
        if(!userToBeFollow){
            return res.status(401).json({
                message: 'Incorrect id'
            });
        }
    
    
        if(req.user._id === req.params.id){
            return res.status(401).json({
                message: 'user cannot Unfollow itself'
            });
        }
    
    
        let authenticatedUser = await User.findById(req.user._id);
        let followingUser = authenticatedUser.following;
        followingUser = followingUser.filter((user) => {
            return user !== req.params.id;
        });
        authenticatedUser.following = followingUser;
        await authenticatedUser.save();

        let userToBeFollow_followingUser = userToBeFollow.followers;
        userToBeFollow_followingUser = userToBeFollow_followingUser.filter((user) => {
            return user !== req.user._id;
        });
        userToBeFollow.followers = userToBeFollow_followingUser;
        await userToBeFollow.save();
    
        
        return res.status(200).json({
            message: 'user Unfollowed successfully'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
   
}


module.exports.getAuthenticatedUser = async (req, res) => {
    try {
        return res.status(200).json({
            user: {
                user_name: req.user.name,
                followers: req.user.followers.length,
                following: req.user.following.length
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}