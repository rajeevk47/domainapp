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
const backendprojectiles = {}

let projectileID=0


io.on('connection', (socket)=>{
    console.log('A user connected ')
    socket.on('initcanavs',({width,height})=>{
       players[socket.id].canvas={
        width,height
       }
    })
    socket.on('boundaries',(boundaries)=>{
        for(const id in boundaries){
            const boundary = boundaries[id]
            
        }
    })
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
        players[socket.id].mute = condition
    }
        io.emit('updatePlayer',players)
    })
    socket.on('addusername',(username)=>{
        players[socket.id] ={
        xx:662,
        yy:300,
        username: username,
        score :0,
        xp:215,
        roomid:1,
        keys : {
            w: {pressed: false},
            a: {pressed: false},
            s: {pressed: false},
            d: {pressed: false},
            q: {pressed: false}
        }
    }
    io.emit('updatePlayer', players)
    })
    socket.on('roomchange',(id)=>{
        players[socket.id].roomid=id
        io.emit('updatePlayer', players)
        socket.emit('event',id)

    })

    socket.on('shoot', ({ x, y, angle }) => {
        projectileID++;
        const velocity = {
            x: Math.cos(angle) * 2,
            y: Math.sin(angle) * 2
        }
        backendprojectiles[projectileID] = {
            x, y, velocity, playerID: socket.id
        }
    })

    socket.on('projectilecollision',(id)=>{
        delete backendprojectiles[id]
    })
    socket.on('projectilecollisionwp',({id,pid})=>{
        if(id!=socket.id){
        delete backendprojectiles[pid]
        players[id].xp-=10}
        if(players[id].xp<=0){
            delete players[id]
            players[socket.id].score++
        }
        io.emit('score--ofid',id)
        io.emit('updatePlayer',players)

    })
    socket.on('keys',(keys)=>{
        players[socket.id].keys = keys
        io.emit('updatePlayer',players)
    })
    socket.on('disconnect',(reason)=>{
        console.log(reason)
        delete players[socket.id]
        io.emit('updatePlayer',players)
    })

})

setInterval(() => {
    for (const id in backendprojectiles) {
        backendprojectiles[id].x += backendprojectiles[id].velocity.x
        backendprojectiles[id].y += backendprojectiles[id].velocity.y
    }
    io.emit('updateprojectiles', backendprojectiles)
    io.emit('updatePlayer',players)
},15)

server.listen(port, ()=> {
    console.log(`App is listening on ${port}`)
} )
