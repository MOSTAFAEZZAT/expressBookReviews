const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
let regd_users = require("./auth_users").authenticated;
const axios = require('axios');

let getBooks = new Promise((resolve,reject) =>{

let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://mostafaezzat-5000.theiadocker-3-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/',
    headers: { 
      'Cookie': 'jhub-reverse-tool-proxy=s%3Aac827b3f-3f01-4ac9-8e5a-8b027a92692d.I81V6xC6LmqhTBqh1KjrqykrEhyEDcMH5FqEryQgl%2FQ'
    }
  };
  
  resolve(axios.request(config).then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  }))
})


let getBooksByISBN = new Promise((resolve,reject) =>{

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://mostafaezzat-5000.theiadocker-3-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/isbn/1',
        headers: { 
          'Cookie': 'jhub-reverse-tool-proxy=s%3Aec0f04ee-52e2-4e9e-9edd-e25395df8976.4zGgXgIC1lbPmsHT4EmgoKJF2VT64%2Fk7AClH8iM%2ByUU'
        }
      };
      
      resolve(axios.request(config).then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      }))
    })

    
public_users.post("/register", (req,res) => {
 
  let username = req.query.username;
  let password = req.query.password;
  if (username && password) {
    if(!isValid(username)){
    users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
     } else {
      return res.status(404).json({message: "User already exists!"});
    }}
  
  return res.status(404).json({message: "Unable to register user."});   return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
 
  res.send(JSON.stringify(books))
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
     let isbns = req.params.isbn 
        res.send(books[isbns])
      
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
 
  let authorName = req.params.author; 
   let filtered_books = Object.values(books).filter((ele) => ele.author == authorName);
    res.send(filtered_books);
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
 
    let titleName = req.params.title; 
    let filtered_books = Object.values(books).filter((ele) => ele.title == titleName);
    res.send(filtered_books);
  
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
 

  let isbn = req.params.isbn;
  let filtered_books = Object.values(books).filter((ele) => ele.review == isbn );
  res.send(filtered_books);


  return res.status(300).json({message: "Yet to be implemented"});
});

//only registered users can login
regd_users.post("/login", (req,res) => {

    const username = req.query.username;
    const password = req.query.password;
    if (!username || !password) {
        return res.status(404).json({message: "Error logging in"});
    }
    if (authenticatedUser(username,password)) {
      let accessToken = jwt.sign({
        data: password
      }, 'access', { expiresIn: 60 * 60 });
      req.session.authorization = {
        accessToken,username
    }
    return res.status(200).send("User successfully logged in");
    } else {
      return res.status(208).json({message: "Invalid Login. Check username and password"});
}
});
module.exports.general = public_users;
