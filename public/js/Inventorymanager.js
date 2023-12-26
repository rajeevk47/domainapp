class inventory{
    constructor({id={number},image,number}){
        this.id= 25*id
        this.image=image
        this.id.number

    }

    drawitems(){
        for(let i=0 ; i <6; i++){
            c.drawImage(Bulletsforhotbar,this.id*i,0,25,25,35,(80+42*i),25,25)
        }
    }
}