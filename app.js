const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

mongoose.connect("mongodb://localhost:27017/blogsDB");

const postSchema = new mongoose.Schema({
    title: String,
    text: String
});

const Post = mongoose.model('Post', postSchema);

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", 'ejs');


app.get('/', (req, res)=>{
    Post.find({}, (err, foundList)=>{
        if (!err){
            res.render('home', {list:foundList})
        }
    })
});


app.get('/about', (req, res)=>{
    res.render('about');
})


app.get('/contact', (req, res)=>{
    res.render('contact');
})

app.get('/compose', (req, res)=>{
    res.render('compose');
})

app.post('/compose', (req, res)=>{

    let post = new Post({
        title: req.body.title,
        text: req.body.text
    });
    post.save(err=>{
        if(!err){
            res.redirect('/');
        }
    });
})

app.get('/posts/:postID', (req, res)=>{
    Post.findOne({_id: req.params.postID}, (err, foundPost)=>{
        if (!err){
            res.render('post', {post:foundPost});
        }
    })
})






app.listen(port, ()=>{
    console.log(`Server Running on port ${port}`);
})