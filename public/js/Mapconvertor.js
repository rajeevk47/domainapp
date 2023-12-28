function convertmap(data,map,boundaries,collidetilenumber,indexnumber){
    for (let i = 0; i < data.length; i += 280) {  //converting 1D array to 2D
        map.push(data.slice(i,280+i)) 
    
    }
    map.forEach((row, i) => {
    row.forEach((Symbol, j) => {
        if(Symbol === collidetilenumber){
         boundaries.push(new Boundary({             //converting 2D array into blocks with position defined
            position: {
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y
            },
            width:5.11*indexnumber,
            height:4.74*indexnumber
         }))
        }
    })
})
socket.emit('boundaries',boundaries)
 return boundaries

}