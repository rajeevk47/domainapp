class Sprite {
    constructor({ position, image, frames = { max: 1} ,sprites,spn,score,username,id,xp,roomid}) {
        this.position = position
        this.image = image
        this.frames = {...frames , val:0 , elapsed : 0}
        
        this.width = this.image.width / this.frames.max 
        this.height = this.image.height
        
        this.moving = false
        this.sprites = sprites
        this.mute = false
        this.spn = spn
        this.score = score
        this.username = username
        this.id = id
        this.xp=xp
        this.roomid=roomid
    }
    draw(x,y) {
        c.drawImage(
            this.image,
            this.frames.val*36,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x-x,
            this.position.y-y,
            this.image.width / this.frames.max,
            this.image.height
            )

            if(!this.moving) return
            if(this.frames.max >1){
                this.frames.elapsed++
            }
            if(this.frames.elapsed%10 ===0){

        if(this.frames.val<this.frames.max-1)this.frames.val++
        else this.frames.val =0}
    } 
    
}

//======================================================================================================================//
