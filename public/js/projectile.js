class Projectile {
    constructor({ position,image, velocity,width,height,id}) {
        this.position=position
        this.image=image
        this.velocity = velocity
        this.width=width
        this.height=height
        this.id=15*id
    }
    draw() {
        c.drawImage(this.image,this.id,0,15,15,this.position.x,this.position.y,15,15)
        
    }

}