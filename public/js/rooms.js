
class Rooms{
    constructor({position,ratio,id,image}){
        this.position=position
        this.ratio=ratio
        this.id=id
        this.image=image
        
    }
    drawroom(x,y){
        c.drawImage(images[this.id],this.position.x-x,this.position.y-y,this.ratio.x,this.ratio.y)
    }
    drawforeground(x,y,image){
        c.drawImage(image,this.position.x-x,this.position.y-y,this.ratio.x,this.ratio.y)
    }
}

class Boundary {
    static width = 5.11;
    static height =4.74;
    constructor({ position,width,height }) {
        this.position = position
        this.width = width
        this.height = height
    }
    draw() {
        c.fillStyle = 'rgba(255,0,0,0.5)'
        c.fillRect(this.position.x,this.position.y, this.width, this.height)
    }
}