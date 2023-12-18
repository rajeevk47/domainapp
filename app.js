const express = require('express')
const app = express()

const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io')
const io = new Server(server)

const port = process.env.port ||3000

app.use(express.static('public'))

app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/index.html')
})

const players = {}

io.on('connection', (socket)=>{
    console.log('A user connected ')
    socket.on('playerlocation',(position)=>{
        players[socket.id].xx = position.x 
        players[socket.id].yy = position.y 
        io.emit('updatePlayer', players)
        
    })
    socket.on('playersprite',(image)=>{
        players[socket.id].sprite = image
        io.emit('updatePlayer', players)
    })
    socket.on('mute',(condition)=>{
        if(players[socket.id]){
        players[socket.id].mute = condition || false}
        io.emit('updatePlayer',players)
    })
    socket.on('addusername',(username)=>{
        players[socket.id] ={
        xx:662,
        yy:300,
        username: username
    }
    io.emit('updatePlayer', players)
    })

    // socket.on('shoot', ({ x, y, angle }) => {
    //     projectileID++;
    //     const velocity = {
    //         x: Math.cos(angle) * 5,
    //         y: Math.sin(angle) * 5
    //     }
    //     backendprojectiles[projectileID] = {
    //         x, y, velocity, playerID: socket.id
    //     }
    // })
    
    socket.on('disconnect',(reason)=>{
        console.log(reason)
        delete players[socket.id]
        io.emit('updatePlayer',players)
    })

})

// setInterval(() => {
//     for (const id in backendprojectiles) {
//         backendprojectiles[id].x += backendprojectiles[id].velocity.x
//         backendprojectiles[id].y += backendprojectiles[id].velocity.y
//     }
//     io.emit('updateprojectiles', backendprojectiles)
//     io.emit('updatePlayer',players)
// },15)

server.listen(port, ()=> {
    console.log(`App is listening on ${port}`)
} )
