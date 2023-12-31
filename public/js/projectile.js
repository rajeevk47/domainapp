class Projectile {
    constructor({ position,image, velocity,width,height,id,shootplayerid}) {
        this.position=position
        this.image=image
        this.velocity = velocity
        this.width=width
        this.height=height
        this.id=15*id
        this.shootplayerid=shootplayerid
    }
    draw(x,y) {
        c.drawImage(this.image,this.id,0,15,15,this.position.x-x,this.position.y-y,15,15)
        
    }

}