require('dotenv').config()
const express = require('express')
const connectToDatabase = require('./database')
const Blog = require('./model/blogModel')
const { multer, storage } = require('./middleware/multerConfig')
const app = express()
const fs = require("fs")
const cors = require('cors')

connectToDatabase()
app.use(express.json())
app.use(express.static('./storage'))
app.use(cors(
    {
        origin: "http://localhost:5173"
    }
))

const upload = multer({storage : storage})

app.get('/', (req, res)=>{
    // res.send("Hello World")
    res.json({
        message : "This is home page"
    })
})

app.post("/blog", upload.single('image'), async(req, res)=>{
    const {title, subtitle, image, description} = req.body
    let filename;
    if(req.file)
        filename = "http://localhost:3000/" + req.file.filename
    else
        filename = "https://static8.depositphotos.com/1323882/960/i/450/depositphotos_9603036-stock-photo-blog-concept.jpg"
    if(!title || !subtitle || !description){
        return res.status(400).json({
            message : "Please provide title, subtitle and description of the blog."
        })
    }
    await Blog.create({
        title : title,
        subtitle : subtitle,
        image : filename,
        description : description
    })
    res.status(200).json({
        message : "Blog API Hit Successfully"
    })
})

app.get("/blog", async(req, res)=>{
    const blogs = await Blog.find() //returns array
    res.status(200).json({
        message : "Blogs fetched successfully",
        data : blogs
    })
})

app.get("/blog/:id", async (req,res)=>{
    const id = req.params.id
    const blog = await Blog.findById(id)   //returns object
    if(!blog){
        res.status(404).json({
            message : "Blog Not Found"
        })
    }else{
        res.status(200).json({
            message : "Data Fetched Successfully",
            data : blog
        })
    }
})

app.delete("/blog/:id", async (req, res)=>{
    const id = req.params.id
    const blog = await Blog.findById(id)
    let imageName = blog.image
    const prefix = "http://localhost:3000/";
    if (imageName.startsWith(prefix)) {
        imageName = imageName.replace(prefix, "");
    }

    fs.unlink(`storage/${imageName}`,(err)=>{
        if(err)
            console.log(err)
    })
    await Blog.findByIdAndDelete(id)
    res.status(200).json({
        message : "Blog Deleted Successfully"
    })
})

app.patch("/blog/:id", upload.single('image'), async (req, res)=>{
    const id = req.params.id
    const {title, subtitle, image, description} = req.body
    let imageName;
    if(req.file){
        imageName = "http://localhost:3000/" + req.file.filename
        const blog = await Blog.findById(id)
        let oldImageName = blog.image
        const prefix = "http://localhost:3000/";
        if (oldImageName.startsWith(prefix)) {
            oldImageName = oldImageName.replace(prefix, "");
        }

        fs.unlink(`storage/${oldImageName}`,(err)=>{
            if(err)
                console.log(err)
            else
                console.log("File deleted successfully")
        })
    }

    await Blog.findByIdAndUpdate(id, {
        title : title,
        subtitle : subtitle,
        image : imageName,
        description : description
    })
    res.status(200).json({
        message : "Blog Edited Successfully"
    })
})

app.listen(process.env.PORT,()=>{
    console.log('NodeJs Project has started')
})