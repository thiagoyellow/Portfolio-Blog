const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const posts = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", function (req, res) {
    const about = {
        avatar_url: "https://instagram.frao1-2.fna.fbcdn.net/v/t51.2885-19/s150x150/95893629_239626743789924_4975996629216657408_n.jpg?_nc_ht=instagram.frao1-2.fna.fbcdn.net&_nc_ohc=Z6yfzR6HfaAAX_TDHcW&oh=2a58e1591aaef1427923cd601b542b0c&oe=5F12199B",
        name: "Thiago Gomes",
        role: "Desenvolvedor JavaScript",
        description: 'Atualmente trabalhando redigindo e revisando matérias sobre dicas financeiras para o Blog da ANABBPrev.' ,
        plus: 'Estudando JavaScript e Node.js com a galera do Bootcamp da <a href="https://rocketseat.com.br" target="_blank"> RocketSeat</a>',
        links: [
            {name: "GitHub", url: "https://github.com/thiagoyellow/"},
            {name: "Linkedin", url: "https://www.linkedin.com/in/thiago-g-santos/"},
            {name: "Instagram", url: "https://www.instagram.com/thiago.g.santos/"}
        ]
    }


    return res.render("about", {about})
})

server.get("/portfolio", function (req, res) {
    return res.render("portfolio", {items: posts})
})

server.get("/post", function(req, res) {
    const id = req.query.id

    const post = posts.find(function(post){
            return post.id == id

    })

    if (!post) {
        return res.send ("Poxa que pena, não encontrei o que você está procurando :(")
    }
    
    return res.render("post", { item: post })
})



server.listen(5000, function(){
    console.log("server is running")
})