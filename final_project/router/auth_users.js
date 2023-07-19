const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

var users = [];

regd_users.get("/", (req,res) => {
    let user = users.map(a => a.username   ) 
    let pass = users.map(a => a.password   ) 

res.send(  user +  pass );

});
const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
let userswithsamename = users.filter((user)=>{
    return user.username === username
  });
  if(userswithsamename.length > 0){
    return true;
  } else {
    return false;
  }
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
let validusers = users.filter((user)=>{
    let username_val = users.map(a => a.username   ) 
    let pass_val = users.map(a => a.password   ) 
   
    return (username_val  == username &&  pass_val == password)
  });
  if(validusers.length > 0){
    return true;
  } else {
    return false;
  }
}

//only registered users can login
regd_users.post("/login", (req,res) => {

    const username = req.query.username;
    const password = req.query.password;
    if (!username || !password) {
        return res.status(404).json({message: "Error logging in"});
    }
    if (authenticatedUser(username,password)== true) {
    //   let accessToken = jwt.sign({
    //     data: password
    //   }, 'access', { expiresIn: 60 * 60 });
    //   req.session.authorization = {
    //     accessToken,username
    // }
    return res.status(200).send("User successfully logged in");
    } else {
      return res.status(208).json({message: "Invalid Login. Check username and password"});
}
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
 
    let isbnNum = req.params.isbn; 
    let bookReview = req.query.review;
    res.send(bookReview)
    let  objIndex = books.findIndex((obj => obj.author ===  "Chinua Achebe" ));
    res.send(objIndex);
    books[objIndex].reviews = bookReview;
    res.send(books);
    return res.status(300).json({message: "Yet to be implemented"});
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
res.send("we are in delete");
    
    let isbnNum = req.params.isbn; 
    let bookReview = req.query.review;
    res.send(bookReview)
    let  objIndex = books.findIndex((obj => obj.author ===  "Chinua Achebe" ));
    res.send(objIndex);
    books[objIndex].reviews = bookReview;
    res.send(books);
    return res.status(300).json({message: "Yet to be implemented"});
});
module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
