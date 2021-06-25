const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express:server,
    autoescape: false,
    noCache: true  
})

server.get("/", function (req,res){
    const data = {
        
    }
    return res.render("about")
})

server.get("/portifolio", function (req,res){
    return res.render("portifolio", {items: videos})
})

server.get("/video", function (req, res){
    const id = req.query.id

    const video = videos.find(function(video){
       return video.id == id
    })

    if (!video) {
        return res.send("Video not found!")
    }

    return res.render("video", {item: video })
})

server.listen(5000, function(){
   console.log("server is running") 
})