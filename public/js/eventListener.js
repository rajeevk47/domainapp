const muteButtonwidth = 110
let mousewheel
let mousewheelc=0 //mousewheelcount
addEventListener('click', (event) => {
    

    if (!players[socket.id]) { return }
    const playerposition = {
        x: players[socket.id].position.x + players[socket.id].width /2,
        y: players[socket.id].position.y + players[socket.id].height/2
    }
    let angle =0
    angle = Math.atan2(event.clientY - playerposition.y, event.clientX  - playerposition.x)    
    if(event.clientX >muteButtonwidth){
        socket.emit('shoot', {
        x: playerposition.x,
        y: playerposition.y,
        angle
    })
    }else if(event.clientX<66&&event.clientX>24){
        for(let i = 0;i<6;i++){
            if(event.clientY>80+42*i && event.clientY<80 +43*(i+1)){
                mousewheelc=i
            }
            
        }
    }
})


addEventListener("wheel", (event) => {
    mousewheel = event.deltaY
    if(mousewheelc==5&&mousewheel>0){
        mousewheelc=0
    }
    else if(mousewheelc==0&& mousewheel<0){
            mousewheelc=5
    }
    else if(mousewheel>0&&mousewheelc<5){
        mousewheelc+=1
    }else if(mousewheel<0&&mousewheelc>0){
        mousewheelc-=1
    }
    
});
