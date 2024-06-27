const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const {v4 : uuidv4} = require("uuid");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id : uuidv4(),
        username : "Rambabu",
        content : "Today is a Great day! :)",
    },
    {
        id : uuidv4(),
        username : "Surya",
        content : "Regural Stuff no exitement",
    },
    {
        id : uuidv4(),
        username : "Ramu",
        content : "Recovering from my darkness.",
    },
    {
        id : uuidv4(),
        username : "Mahesh",
        content : "Good to see you back Nagarjuna.",
    },
];

app.get('/posts', (req, res) => {
    res.render("index.ejs", {posts});
});

app.get('/posts/new', (req, res) => {
    res.render("newPost.ejs");
});

app.post('/posts', (req, res) => {
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect("/posts");
});

app.get('/posts/:id', (req, res) => {
    let {id} = req.params;
    let post = posts.find( (p) => id === p.id);
    res.render("show.ejs", { post });
});

app.patch('/posts/:id', (req, res) => {
    let {id} = req.params;
    let post = posts.find( (p) => id === p.id);
    let content = req.body.content;
    post.content = content;
    res.redirect('/posts');
    
});

app.get('/posts/:id/edit', (req, res) => {
    let {id} = req.params;
    let post = posts.find( (p) => id === p.id);
    res.render("edit.ejs", {post});
});

app.delete('/posts/:id', (req, res) => {
    let {id} = req.params;
    posts = posts.filter( (p) => id !== p.id);
    res.redirect('/posts');
});

app.listen(port, () => {
    console.log(`server listening`);
});