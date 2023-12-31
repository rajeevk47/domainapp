const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const socket = io()

Agora()

// const devicepixelratio = window.devicePixelRatio || 1
canvas.width = window.innerWidth
canvas.height = window.innerHeight
c.fillStyle = 'white'
c.fillRect(30, 0, canvas.width, canvas.height)
//=========================//
const offset = {x: 100,y : 0}//Offset to the map

//==========Loading images=========//
const image = new Image();image.src = './img/bg.png'
const bgimage=new Image();bgimage.src = './img/background1.png'
const Foreground1 = new Image();Foreground1.src = './img/foreground1.png'
const Foreground0 = new Image();Foreground0.src = './img/foreground0.png'

const playerdownImage = new Image();playerdownImage.src = './img/Playersprite/playerDown.png'
const playerupImage = new Image();playerupImage.src = './img/Playersprite/playerUp.png'
const playerleftImage = new Image();playerleftImage.src = './img/Playersprite/playerLeft.png'
const playerrightImage = new Image();playerrightImage.src = './img/Playersprite/playerRight.png'
const Blink = new Image();Blink.src = './img/blink.png'
const microphone = new Image();microphone.src = './img/Playersprite/microphone.png'
const Bullets =new Image();Bullets.src='./img/Bullets.png'
const Hotbar =new Image();Hotbar.src='./img/Hotbar.png'
const Bulletsforhotbar =new Image();Bulletsforhotbar.src='./img/Bulletscombine.png'

const healthbar1 =new Image();healthbar1.src='./img/Health/meter_bar_center-repeating_blue.png'
const healthbar2 =new Image();healthbar2.src='./img/Health/meter_bar_holder_center-repeating_blue.png'
const healthbar4 =new Image();healthbar4.src='./img/Health/meter_bar_holder_right_edge_blue.png'
const healthbar7 =new Image();healthbar7.src='./img/Health/meter_icon_holder_blue.png'
const healthbaricon =new Image();healthbaricon.src='./img/Health/health.png'

const Resbar1 =new Image();Resbar1.src='./img/Resistance/meter_bar_center-repeating_purple.png'
const Resbar2 =new Image();Resbar2.src='./img/Resistance/meter_bar_holder_center-repeating_purple.png'
const Resbar3 =new Image();Resbar3.src='./img/Resistance/meter_bar_holder_right_edge_purple.png'
const Resbar4 =new Image();Resbar4.src='./img/Resistance/meter_icon_holder_purple.png'
const Resbaricon =new Image();Resbaricon.src='./img/Resistance/sheild.png'
//=============================================//
//============Loading audio====================//
const walksound = new Audio;walksound.src = './data/audio/walksound.mp3'
const laser_gun = new Audio;laser_gun.src= './data/audio/laser-gun.mp3'
const shotgun = new Audio;shotgun.src= './data/audio/gun.mp3'
//=============================================//

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
    ratio:{
        x:1430,
        y:760
    },
    id:1
})
const foreground = new Rooms({
    position: {
        x: offset.x,
        y: offset.y
    },
    ratio:{
        x:1430,
        y:760
    }
})

//================================//

//===============================//
const projectiles = {}



//=============Player sprite=============//


const players = []
let other =[]

socket.on('updateprojectiles', (backendprojectiles)=>{
    for(const id in backendprojectiles){
    if(!players[socket.id]){return}
    const backendprojectile = backendprojectiles[id]
    // if(players[socket.id].roomid==players[backendprojectile.playerID].roomid){
    if(!projectiles[id]){
        projectiles[id]=new Projectile({
           position:{ 
            x:backendprojectile.x,
            y:backendprojectile.y},
            image:Bullets,
            width:8,
            height:8,
            id:backendprojectile.hotbarid,
            shootplayerid: backendprojectile.playerID

        })
        shotgun.play()
      }
    else{
        projectiles[id].position.x+=backendprojectile.velocity.x
        projectiles[id].position.y+=backendprojectile.velocity.y
        
     }
    // }
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
            if(players[socket.id]){background.id= players[socket.id].roomid}
            document.querySelector(`div[data-id="${id}"]`).innerHTML= `${backendPlayer.username}: ${backendPlayer.score}`

            if (players[id].spn == 2) {
                players[id].image = players[id].sprites.left
            }
            else if (players[id].spn == 3) {
                players[id].image = players[id].sprites.right
            }
            else if (players[id].spn == 0) {
                players[id].image = players[id].sprites.up
            }
            else if (players[id].spn == 1) {
                players[id].image = players[id].sprites.down
            }
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
const collisionsMap1 = []
const collisionsMap0 = []
const boundaries1 = []
const boundaries0 = []
const doormap1 = []
const doormap0 = []
const door1=[]
const door0=[]

convertmap(collisions2,collisionsMap1,boundaries1,106501,1)//Mapconvertor.js
convertmap(collisions1,collisionsMap0,boundaries0,36870,1)//Mapconvertor.js
convertmap(Door1,doormap1,door1,106506,2)
convertmap(Door0,doormap0,door0,20481,2)
//================================================================================//
//=================================ANIMATION======================================//
//================================================================================//
let camerax=0 
let cameray=0
function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(animate)

    if(players[socket.id]){
    camerax = players[socket.id].position.x - canvas.width/2
    cameray = players[socket.id].position.y - canvas.height/2}

    background.drawroom(camerax,cameray);
    // c.drawImage(Blink,442-camerax,205-cameray,20,20)

if(!players[socket.id]){return}


    for (const id in players) {
        const player = players[id];
        if(players[id].roomid==players[socket.id].roomid){
            player.draw(camerax,cameray);
            c.font = "bold 15px Comic Sans MS";
            c.fillStyle="white"
            c.textAlign= 'center'
            c.fillText(player.username,player.position.x+player.width/2-camerax,player.position.y-cameray)
              if (!players[id].mute) {
                c.drawImage(microphone, player.position.x-camerax, player.position.y-cameray)
            }
            for(const id in projectiles){
                const Projectile=projectiles[id]
                Projectile.draw(camerax,cameray)
            }
        
        }
        
        
        
    }
    let shield = false
    let moving = true
    let tocheck

    if(players[socket.id].roomid==1){
        foreground.drawforeground(camerax,cameray,Foreground1)
        tocheck = boundaries1
        doortocheck = door1
      }
    else if(players[socket.id].roomid==0){
        foreground.drawforeground(camerax,cameray,Foreground0)
        tocheck = boundaries0
        doortocheck = door0
    }


    
    c.drawImage(Hotbar,10,60,80,400)
    inv.drawitems()
//=================================================//
    Health.draw()
    Resistance.draw()


    // tocheck.forEach(boundary => {boundary.draw()}) 
    // doortocheck.forEach(boundary => {boundary.draw()}) //can be used to locate barrier blocks



for(const id in projectiles){
for(let i=0 ;i <tocheck.length;i++){
    const boundary = tocheck[i]
    if(rectangularcollisionwithoutwalls({
        rectangle1: projectiles[id],
        rectangle2: {...boundary, position:{x:boundary.position.x + boundary.width/2 ,y:boundary.position.y+ boundary.height/2}
           }
         }
       )
    ){socket.emit('projectilecollision',id)}
}}

for(const id in players){
    if( players[id].roomid==players[socket.id].roomid){
    for(const i in projectiles){
        if(rectangularcollisionwithoutwalls({
            rectangle2: players[id],
            rectangle1: projectiles[i]
             }
           )
        ){console.log(id,projectiles[i].shootplayerid)
            if(id!=projectiles[i].shootplayerid){
                socket.emit('projectilecollisionwp',{id:id,pid:i})
            }
        }
    }
}}

for(const id in players){
    for(let i =0 ; i<doortocheck.length; i++){
        const doorboundary =  doortocheck[i]
        if(rectangularcollision({
            rectangle1: players[id],
            rectangle2: {...doorboundary, position:{x:doorboundary.position.x ,y:doorboundary.position.y}
               }
             }
           )
        ){
            console.log(players[socket.id].roomid)
            if(players[socket.id].roomid==0){
                console.log('hello')
                players[socket.id].position.x=240
                players[socket.id].roomid=1
                socket.emit('roomchange',players[socket.id].roomid)
            }
            else if(players[socket.id].roomid==1){
                console.log('hello')
                players[socket.id].position.x =canvas.width-130
                players[socket.id].roomid=0
                 socket.emit('roomchange',players[socket.id].roomid)
            }
            console.log(players[socket.id].roomid)
            
        }
    }
}

    walksound.pause()


 
    if (keys.w.pressed || touchup === true){
        players[socket.id].moving = true
        players[socket.id].image = players[socket.id].sprites.up
        for(let i=0 ;i <tocheck.length;i++){
            const boundary = tocheck[i]
            if(rectangularcollision({
                rectangle1: players[socket.id],
                rectangle2: {...boundary, position:{x:boundary.position.x ,y:boundary.position.y+5}
                   }
                 }
               )
            ){moving =false;players[socket.id].moving=false ; break}
        }
    if(moving){
        players[socket.id].position.y-=5
        walksound.play()
        socket.emit('playerlocation',players[socket.id].position)
        socket.emit('playersprite','0')

    }
    
    }
    else if (keys.s.pressed || touchdown===true) {
        players[socket.id].moving=true
        players[socket.id].image = players[socket.id].sprites.down
        for(let i=0 ;i <tocheck.length;i++){
            const boundary = tocheck[i]
            if(rectangularcollision({
                rectangle1: players[socket.id],
                rectangle2: {...boundary, position:{x:boundary.position.x ,y:boundary.position.y-5}
                   }
                 }
               )
            ){
                moving =false;players[socket.id].moving=false ;
                break
            }
                }
        if(moving){
            players[socket.id].position.y+=5
            walksound.play()
            socket.emit('playerlocation',players[socket.id].position)
            socket.emit('playersprite','1')

    }
    }
    else if (keys.a.pressed|| touchleft===true) {
        players[socket.id].moving=true
        players[socket.id].image = players[socket.id].sprites.left
        for(let i=0 ;i <tocheck.length;i++){
            const boundary = tocheck[i]
            if(rectangularcollision({
                rectangle1: players[socket.id],
                rectangle2: {...boundary, position:{x:boundary.position.x+5,y:boundary.position.y}
                   }
                 }
               )
            ){
                moving =false;players[socket.id].moving=false ;
                break
            }
                }
        if(moving){
            players[socket.id].position.x-=5
            walksound.play()
            socket.emit('playerlocation',players[socket.id].position)
            socket.emit('playersprite','2')

        }
    }
    else if (keys.d.pressed|| touchright===true) {
        players[socket.id].moving=true
        players[socket.id].image=players[socket.id].sprites.right
        for(let i=0 ;i <tocheck.length;i++){
            const boundary = tocheck[i]
            if(rectangularcollision({
                rectangle1: players[socket.id],
                rectangle2: {...boundary, position:{x:boundary.position.x-5,y:boundary.position.y}
                   }
                 }
               )
            ){
                moving =false;players[socket.id].moving=false ;
                break
            }
                }
        
        if(moving){
            players[socket.id].position.x+=5
            walksound.play()
            socket.emit('playerlocation',players[socket.id].position)
            socket.emit('playersprite','3')


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