const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const socket = io()

//===========Agora=========//
Agora()
//==========================//

// const devicepixelratio = window.devicePixelRatio || 1
canvas.width = window.innerWidth
canvas.height = window.innerHeight
c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height)

//=========================//
const offset = {x: 100,y : 0}//Offset to the map

//==========Loading inmages=========//

const image = new Image()
image.src = './img/bg.png'
const bgimage=new Image()
bgimage.src = './img/background1.png'
const playerdownImage = new Image()
playerdownImage.src = './img/Playersprite/playerDown.png'
const Foreground = new Image()
Foreground.src = './img/foreground.png'
const playerupImage = new Image()
playerupImage.src = './img/Playersprite/playerUp.png'
const playerleftImage = new Image()
playerleftImage.src = './img/Playersprite/playerLeft.png'
const playerrightImage = new Image()
playerrightImage.src = './img/Playersprite/playerRight.png'
const Blink = new Image()
Blink.src = './img/blink.png'
const walksound = new Audio
walksound.src = './data/audio/walksound.mp3'
const laser_gun = new Audio
laser_gun.src= './data/audio/laser-gun.mp3'
const shotgun = new Audio
shotgun.src= './data/audio/gun.mp3'
const microphone = new Image()
microphone.src = './img/Playersprite/microphone.png'
const Bullets =new Image()
Bullets.src='./img/Bullets.png'
const Hotbar =new Image()
Hotbar.src='./img/Hotbar.png'
const Bulletsforhotbar =new Image()
Bulletsforhotbar.src='./img/Bulletscombine.png'

const healthbar1 =new Image()
healthbar1.src='./img/Health/meter_bar_center-repeating_blue.png'
const healthbar2 =new Image()
healthbar2.src='./img/Health/meter_bar_holder_center-repeating_blue.png'
const healthbar4 =new Image()
healthbar4.src='./img/Health/meter_bar_holder_right_edge_blue.png'
const healthbar7 =new Image()
healthbar7.src='./img/Health/meter_icon_holder_blue.png'
const healthbaricon =new Image()
healthbaricon.src='./img/Health/health.png'

const Resbar1 =new Image()
Resbar1.src='./img/Resistance/meter_bar_center-repeating_purple.png'
const Resbar2 =new Image()
Resbar2.src='./img/Resistance/meter_bar_holder_center-repeating_purple.png'
const Resbar3 =new Image()
Resbar3.src='./img/Resistance/meter_bar_holder_right_edge_purple.png'
const Resbar4 =new Image()
Resbar4.src='./img/Resistance/meter_icon_holder_purple.png'
const Resbaricon =new Image()
Resbaricon.src='./img/Resistance/sheild.png'


//=============Abilties================//

let Health = new Ability({
    id:1,
    levelimage:healthbar1,
    x:1210,
    y:0,
    bar2:healthbar2,
    bar4:healthbar4,
    bar7:healthbar7,
    baricon:healthbaricon,
    xfactor:40,
    yfactor:0

    
})

let Resistance= new Ability({
    id:2,
    levelimage:Resbar1,
    x:910,
    y:0,
    bar2:Resbar2,
    bar4:Resbar3,
    bar7:Resbar4,
    baricon:Resbaricon,
    xfactor:40,
    yfactor:0

    
})
//===============Inventory================//

let inv = new inventory({
    id:1

})


//================================//
const images =[bgimage,image]
const background = new Rooms({
    position: {
        x: offset.x,
        y: offset.y 
    },
    image: image,
    ratio:{
        x:1430,
        y:760
    },
    id:1
})
const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: Foreground
})

//================================//

//===============================//
const projectiles = {}



//=============Player sprite=============//


const players = []
let other =[]
const canvasx = canvas.width / 2 - (playerdownImage.width / 4) / 2
const canvasy = canvas.height / 2 - playerdownImage.height / 2




socket.on('updateprojectiles', (backendprojectiles)=>{
    for(const id in backendprojectiles){
    const backendprojectile = backendprojectiles[id]
    if(!projectiles[id]){
        projectiles[id]=new Projectile({
           position:{ 
            x:backendprojectile.x,
            y:backendprojectile.y},
           image:Bullets,
           width:8,
           height:8,
           id:mousewheelc

        })
        shotgun.play()
      }
    else{
        projectiles[id].position.x+=backendprojectile.velocity.x
        projectiles[id].position.y+=backendprojectile.velocity.y
     }
    }

    for(const id in projectiles){
        if(!backendprojectiles[id]){
            delete projectiles[id]
        }
    }

})

socket.on('updatePlayer', (backendPlayers) => {
    for (const id in backendPlayers) {
        const backendPlayer = backendPlayers[id];
        if (!players[id]) {
            players[id] = new Sprite({
                position: {
                     x: backendPlayer.xx,
                     y: backendPlayer.yy
                },
                image: playerdownImage,
                frames: {
                    max: 4
                },
                sprites: {
                    up: playerupImage,
                    left: playerleftImage,
                    down: playerdownImage,
                    right: playerrightImage,
                },
                spn : 2,
                score:0,
                xp:215,
                roomid:1,
                keys : {
                    w: {pressed: false},
                    a: {pressed: false},
                    s: {pressed: false},
                    d: {pressed: false},
                    q: {pressed: false}
                }
            });
            // data-score ="${backendPlayer.score}"
        document.querySelector('#playerlabels').innerHTML+=`<div data-id ="${id}" > ${backendPlayer.username}: ${players[id].score} </div>`
        }
        else {
            players[id].position.x = backendPlayer.xx;
            players[id].position.y = backendPlayer.yy;
            players[id].mute = backendPlayer.mute
            players[id].spn = backendPlayer.sprite
            players[id].username = backendPlayer.username
            players[id].score=backendPlayer.score
            players[id].xp = backendPlayer.xp
            players[id].roomid = backendPlayer.roomid
            players[id].keys = backendPlayer.keys
            socket.on('score--ofid',(id)=>{
                if(id===socket.id){
                    Health.xp=players[id].xp}
            })
            players[id].roomid = backendPlayer.roomid
            if(players[socket.id]){background.id= players[socket.id].roomid}
            document.querySelector(`div[data-id="${id}"]`).innerHTML= `${backendPlayer.username}: ${backendPlayer.score}`
        }
    }
        
    for(const id in players){
        if(!backendPlayers[id]){
            const divtodel=document.querySelector(`div[data-id="${id}"]`)
            divtodel.parentNode.removeChild(divtodel)
            if(id === socket.id){
             document.querySelector('#userform').style.display='block'
            }
            delete players[id]
        }
    }
    for(const id in players){
        if(socket.id != id){
          other[id] = players[id]
        }
    }

});

//============================================//

const keys = {
    w: {pressed: false},
    a: {pressed: false},
    s: {pressed: false},
    d: {pressed: false},
    q: {pressed: false}
}

let touchup,touchdown,touchleft,touchright

window.addEventListener('touchstart',touchstart)
window.addEventListener('touchmove', touchmove)
window.addEventListener('touchend',touchend)



let number,indexnumber
const collisionsMap = []
const boundaries = []
const doormap = []
const door=[]

convertmap(collisions2,collisionsMap,boundaries,106504,1)//Mapconvertor.js
convertmap(Door1,doormap,door,106506,2)
//================================================================================//
//=================================ANIMATION======================================//
//================================================================================//
function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(animate)
    background.drawroom();
    c.drawImage(Hotbar,10,60,80,400)
    inv.drawitems()
    // c.drawImage(Blink,442,205,20,20)

    for(const id in projectiles){
        const Projectile=projectiles[id]
        Projectile.draw()
    }
    if(!players[socket.id]){return}
    for (const id in players) {
        const player = players[id];
        if (player.spn == 3) {
            player.image = player.sprites.left
        }
        else if (player.spn == 4) {
            player.image = player.sprites.right
        }
        else if (player.spn == 1) {
            player.image = player.sprites.up
        }
        else if (player.spn == 2) {
            player.image = player.sprites.down
        }
        if(player.roomid===players[socket.id].roomid){
            delete player
        }
        if(players[id].roomid==players[socket.id].roomid){
            player.draw();
            c.font = "bold 15px Comic Sans MS";
        c.fillStyle="white"
        c.textAlign= 'center'
        c.fillText(player.username,player.position.x+player.width/2,player.position.y)
            if (!players[id].mute) {
                c.drawImage(microphone, players[id].position.x, players[id].position.y)
            }
        }
        
        
    }

    // boundaries.forEach(boundary => {boundary.draw()}) 
    // door.forEach(boundary => {boundary.draw()}) //can be used to locate barrier blocks
    // foreground.draw()
    let shield = false
//=================================================//
    Health.draw()
    Resistance.draw()




    c.lineWidth=8
    c.strokeStyle='red'
    c.strokeRect(24,(72+42*mousewheelc),50,40);








    let moving = true

    let player = players[socket.id]
    if (!player) { return }





// for(const id in projectiles){
// for(let i=0 ;i <boundaries.length;i++){
//     const boundary = boundaries[i]
//     if(rectangularcollisionwithoutwalls({
//         rectangle1: projectiles[id],
//         rectangle2: {...boundary, position:{x:boundary.position.x + boundary.width/2 ,y:boundary.position.y+ boundary.height/2}
//            }
//          }
//        )
//     ){socket.emit('projectilecollision',id)}
// }}

// for(const id in players){
//     if( players[id].roomid==players[socket.id].roomid){
//     for(const i in projectiles){
//         if(rectangularcollisionwithoutwalls({
//             rectangle2: players[id],
//             rectangle1: projectiles[i]
//              }
//            )
//         ){
            
//             // if(keys.q.pressed){console.log('knkjbhbh')}
//             socket.emit('projectilecollisionwp',{id:id,pid:i})
            
            
        
//         }
//     }
// }}

// for(const id in players){
//     for(let i =0 ; i<door.length; i++){
//         const doorboundary =  door[i]
//         if(rectangularcollision({
//             rectangle1: players[id],
//             rectangle2: {...doorboundary, position:{x:doorboundary.position.x ,y:doorboundary.position.y}
//                }
//              }
//            )
//         ){
//             players[socket.id].roomid=0
//             socket.emit('roomchange',players[socket.id].roomid)
//             players[socket.id].position.x =canvas.width-130
//         }
//     }
// }


    walksound.pause()


 
    if (keys.w.pressed || touchup === true) {
        players[socket.id].moving = true
        players[socket.id].image = players[socket.id].sprites.up
        // for(let i=0 ;i <boundaries.length;i++){
        //     const boundary = boundaries[i]
            // if(rectangularcollision({
            //     rectangle1: player,
            //     rectangle2: {...boundary, position:{x:boundary.position.x ,y:boundary.position.y+5}
            //        }
            //      }
            //    )
            // ){moving =false;players[socket.id].moving=false ; break}
        // }
    if(moving){
        players[socket.id].position.y-=5
        walksound.play()
        socket.emit('playerlocation',players[socket.id].position)
        socket.emit('playersprite','1')

    }
    
    }
    else if (keys.s.pressed || touchdown===true) {
        players[socket.id].moving=true
        players[socket.id].image = players[socket.id].sprites.down
        // for(let i=0 ;i <boundaries.length;i++){
        //     const boundary = boundaries[i]
            // if(rectangularcollision({
            //     rectangle1: players[socket.id],
            //     rectangle2: {...boundary, position:{x:boundary.position.x ,y:boundary.position.y-5}
            //        }
            //      }
            //    )
            // ){
            //     moving =false;players[socket.id].moving=false ;
            //     break
            // }
                // }
        if(moving){
            players[socket.id].position.y+=5
            walksound.play()
            socket.emit('playerlocation',players[socket.id].position)
            socket.emit('playersprite','2')

    }
    }
    else if (keys.a.pressed|| touchleft===true) {
        players[socket.id].moving=true
        players[socket.id].image = players[socket.id].sprites.left
        // for(let i=0 ;i <boundaries.length;i++){
        //     const boundary = boundaries[i]
            // if(rectangularcollision({
            //     rectangle1: players[socket.id],
            //     rectangle2: {...boundary, position:{x:boundary.position.x+5,y:boundary.position.y}
            //        }
            //      }
            //    )
            // ){
            //     moving =false;players[socket.id].moving=false ;
            //     break
            // }
                // }
        if(moving){
            players[socket.id].position.x-=5
            walksound.play()
            socket.emit('playerlocation',players[socket.id].position)
            socket.emit('playersprite','3')

        }
    }
    else if (keys.d.pressed|| touchright===true) {
        players[socket.id].moving=true
        players[socket.id].image=players[socket.id].sprites.right
        // for(let i=0 ;i <boundaries.length;i++){
        //     const boundary = boundaries[i]
            // if(rectangularcollision({
            //     rectangle1: players[socket.id],
            //     rectangle2: {...boundary, position:{x:boundary.position.x-5,y:boundary.position.y}
            //        }
            //      }
            //    )
            // ){
            //     moving =false;players[socket.id].moving=false ;
            //     break
            // }
                // }
        
        if(moving){
            players[socket.id].position.x+=5
            walksound.play()
            socket.emit('playerlocation',players[socket.id].position)
            socket.emit('playersprite','4')


        }
    }
    else if(keys.q.pressed){
        
    }
    socket.emit('keys',keys)
    
        
    
    
}

animate()

window.addEventListener('keydown', checkkeydown)
window.addEventListener('keyup',checkkeyup)

document.querySelector('#userform').addEventListener('submit',(e)=>{
    e.preventDefault()
    Health.xp=215
    Resistance.xp =215
    document.querySelector('#userform').style.display = 'none'
    socket.emit('addusername',(document.querySelector('#userinput').value))
})



//----------//