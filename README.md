# api-assignment
# steps to run this code on your local system
1. open console and go to the directory of your file
2. write "npm install" and then enter
3. create .env file in the root folder of the directory and add your value as
    DATABASE_PASS={your database password},
    MONGO_USER={your mongodb user name},
    MONGO_DATABASE={your db name},
    JWTSECRETKEY={your jwt secret}
4. and then write "npm start" and then enter, it will start the server on port 8000.

# steps to run the test cases written in test folder
npx mocha .\test\api_test.js
