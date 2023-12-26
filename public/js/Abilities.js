class Ability{
   constructor({xp,levelimage,x,y,bar2,bar4,bar7,baricon,xfactor,id,yfactor}){
      this.xp=xp
      this.id=id
      this.levelimage=levelimage
    //   this.imagecropratiowidth=xp
      this.x=x
      this.y=y
      this.bar2=bar2 //Sequence
      this.bar4=bar4//End of sequence
      this.bar7=bar7//Circle to contain icon
      this.baricon=baricon//Icon in the circle
      this.xfactor=xfactor
      this.yfactor=yfactor
   }
   
   draw(){
    c.drawImage(this.bar2,this.x,this.yfactor,40,30)
    c.drawImage(this.bar2,this.x+this.xfactor,this.yfactor,40,30)
    c.drawImage(this.bar2,this.x+2*this.xfactor,this.yfactor,40,30)
    c.drawImage(this.bar2,this.x+3*this.xfactor,this.yfactor,40,30)
    c.drawImage(this.bar2,this.x+4*this.xfactor,this.yfactor,40,30)
    c.drawImage(this.bar4,this.x+5*this.xfactor,this.yfactor,30,30)

    c.drawImage(this.levelimage,this.x,this.y,this.xp,30)

    c.drawImage(this.bar7,this.x-this.xfactor/2,this.yfactor,40,40)
    c.drawImage(this.baricon,this.x-this.xfactor/4,this.yfactor+10,20,20)
     }
   }

