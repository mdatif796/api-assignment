const chai = require("chai");
const should = require('chai').should();
const chaiHTTP = require('chai-http');

chai.use(chaiHTTP);


describe("API Test", () => {
    // Test the POST route for creating user 
    // in this api 
    // we need --> name, email and password
    describe("POST /api/create-user", () => {
        it("It should create the user and return that user", (done) => {
            chai
                .request("https://social-site-api.onrender.com")
                .post("/api/create-user")
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({email: 'a@a.com', password: '123', name: 'edward'})
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    response.body.should.have.property('user');
                done();
                });
        }).timeout(30000);
    });

    // // Test the POST route for authentication 
    // // in this api 
    // // we need --> email and password
    describe("POST /api/authenticate", () => {
        it("It should authenticate the user and return JWT token", (done) => {
            chai
                .request("https://social-site-api.onrender.com")
                .post("/api/authenticate")
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({email: 'a@a.com', password: '123'})
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    response.body.should.have.property('jwt');
                done();
                });
        }).timeout(30000);
    });


    // Test the POST route for authenticated user follow the user which id is passed in params
    // in this api 
    // we need --> authenticated user jwt token
    // id of user who will be followed
    const Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2JhNjg3NjJjNTQ2ZmJkMWJiZTViNzIiLCJlbWFpbCI6Im1kYXRpZjc5NkBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMyIsIm5hbWUiOiJhdGlmIDIiLCJmb2xsb3dlcnMiOltdLCJmb2xsb3dpbmciOlsiNjNiYTViNWMwMTc0NDFjYTc5MmQ2OGY2Il0sImNyZWF0ZWRBdCI6IjIwMjMtMDEtMDhUMDY6NTM6NDIuNzgyWiIsInVwZGF0ZWRBdCI6IjIwMjMtMDEtMDhUMDc6MDk6MjguMzg1WiIsIl9fdiI6MywiaWF0IjoxNjczODkyNjc2fQ._dC0kpY06cdUXoThSHruUobbdjqG8LE2xj8bxmUzzGU"
    describe("POST /api/follow/:id", () => {
        it("Authenticate user should follow the user with id given in params", (done) => {
            chai
                .request("https://social-site-api.onrender.com")
                .post("/api/follow/63bcebe14884e17f4d46e952")
                .set({'content-type': 'application/x-www-form-urlencoded' , 'Authorization': `Bearer ${Token}`})
                .end((err, response) => {
                    response.should.have.status(200);
                done();
                });
        }).timeout(30000);
    });

    // // Test the POST route for authenticated user unfollow the user which id is passed in params
    // // in this api 
    // // we need --> authenticated user jwt token
    // // id of user who will be unfollowed
    describe("POST /api/unfollow/:id", () => {
        it("Authenticate user should unfollow the user with id given in params", (done) => {
            chai
                .request("https://social-site-api.onrender.com")
                .post("/api/unfollow/63bcebe14884e17f4d46e952")
                .set({'content-type': 'application/x-www-form-urlencoded' , 'Authorization': `Bearer ${Token}`})
                .end((err, response) => {
                    response.should.have.status(200);
                done();
                });
        }).timeout(30000);
    });

    // Test the GET route to return the authenticated user profile
    // in this api 
    // we need --> authenticated user jwt token
    describe("GET /api/user", () => {
        it("Return the profile of authenticated user", (done) => {
            chai
                .request("https://social-site-api.onrender.com")
                .get("/api/user")
                .set({'content-type': 'application/x-www-form-urlencoded' , 'Authorization': `Bearer ${Token}`})
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    response.body.should.have.property('user');
                    response.body.should.have.property('user').property('user_name');
                    response.body.should.have.property('user').property('followers');
                    response.body.should.have.property('user').property('following');
                done();
                });
        }).timeout(30000);
    });

    // Test the POST route to create a post by authenticated user
    // in this api 
    // we need --> authenticated user jwt token
    // post --> title and description
    describe("POST /api/posts", () => {
        it("Add a new post by authenticated user", (done) => {
            chai
                .request("https://social-site-api.onrender.com")
                .post("/api/posts")
                .set({'content-type': 'application/x-www-form-urlencoded' , 'Authorization': `Bearer ${Token}`})
                .send({title: 'dummy post title', description: 'dummy post description'})
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    response.body.should.have.property('post');
                    response.body.should.have.property('post').property('post_id');
                    response.body.should.have.property('post').property('title');
                    response.body.should.have.property('post').property('description');
                    response.body.should.have.property('post').property('created_at');
                done();
                });
        }).timeout(30000);
    });

    // Test the DELETE route for deleting a post by authenticated user
    // in this api 
    // we need --> authenticated user jwt token
    // post --> post id which need to be deleted 
    describe("DELETE /api/posts/:id", () => {
        it("Delete a post by authenticated user", (done) => {
            chai
                .request("https://social-site-api.onrender.com")
                .delete("/api/posts/63c59b0e5e7c49fb27737f6b")
                .set({'content-type': 'application/x-www-form-urlencoded' , 'Authorization': `Bearer ${Token}`})
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    response.body.should.have.property('message');
                done();
                });
        }).timeout(30000);
    });

    // Test the POST route for like a post by authenticated user
    // in this api 
    // we need --> authenticated user jwt token
    // post --> post id which will be liked 
    describe("POST /api/like/:id", () => {
        it("Like a post by authenticated user", (done) => {
            chai
                .request("https://social-site-api.onrender.com")
                .post("/api/like/63c59ae05e7c49fb27737f68")
                .set({'content-type': 'application/x-www-form-urlencoded' , 'Authorization': `Bearer ${Token}`})
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    response.body.should.have.property('message');
                done();
                });
        }).timeout(30000);
    });

    // Test the POST route for unlike a post by authenticated user
    // in this api 
    // we need --> authenticated user jwt token
    // post --> post id which will be unliked 
    describe("POST /api/unlike/:id", () => {
        it("Unike a post by authenticated user", (done) => {
            chai
                .request("https://social-site-api.onrender.com")
                .post("/api/unlike/63c59ae05e7c49fb27737f68")
                .set({'content-type': 'application/x-www-form-urlencoded' , 'Authorization': `Bearer ${Token}`})
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    response.body.should.have.property('message');
                done();
                });
        }).timeout(30000);
    });

    // Test the POST route for adding a comment on a post by authenticated user
    // in this api 
    // we need --> authenticated user jwt token
    // post --> post id on which comment will be add
    describe("POST /api/comment/:id", () => {
        it("Comment on a post by authenticated user", (done) => {
            chai
                .request("https://social-site-api.onrender.com")
                .post("/api/comment/63c59ae05e7c49fb27737f68")
                .set({'content-type': 'application/x-www-form-urlencoded' , 'Authorization': `Bearer ${Token}`})
                .send({input: 'dummy comment on post'})
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    response.body.should.have.property('message');
                    response.body.should.have.property('comment_id');
                done();
                });
        }).timeout(30000);
    });

    // Test the GET route for getting a post by its id
    // in this api 
    // post --> post id 
    describe("GET /api/posts/:id", () => {
        it("Get a post by its id", (done) => {
            chai
                .request("https://social-site-api.onrender.com")
                .get("/api/posts/63c59ae05e7c49fb27737f68")
                .set({'content-type': 'application/x-www-form-urlencoded' , 'Authorization': `Bearer ${Token}`})
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    response.body.should.have.property('post');
                    response.body.should.have.property('post').property('user');
                    response.body.should.have.property('post').property('title');
                    response.body.should.have.property('post').property('likes');
                    response.body.should.have.property('post').property('comments');
                    response.body.should.have.property('post').property('description');
                done();
                });
        }).timeout(30000);
    });

    // Test the GET route for getting all post created by authenticated user
    // in this api 
    // we need --> authenticated user jwt token
    describe("GET /api/all_posts", () => {
        it("Get all posts created by authenticated user", (done) => {
            chai
                .request("https://social-site-api.onrender.com")
                .get("/api/all_posts")
                .set({'content-type': 'application/x-www-form-urlencoded' , 'Authorization': `Bearer ${Token}`})
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    response.body.posts.should.be.a("array");
                done();
                });
        }).timeout(30000);
    });

});