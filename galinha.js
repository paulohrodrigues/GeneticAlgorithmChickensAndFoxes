class Galinha{
    
    constructor(ctx,position,positions){
        this.cor        = "#FF0000";  
        this.morteI     = 20;
        this.morte      = false;
        this.ctx        = ctx;
        this.positions  = positions;
        this.position   = position;
        this.draw();
    }

    draw(){
        this.ctx.fillStyle=this.cor;
        this.ctx.fillRect(this.position.x,this.position.y,25,25);
    }

    translate(speed,i){
        if(this.morte==true){
            console.log("morto");
            // return 0;
        }else{
            switch(this.positions[i]){
                case "l":{
                    this.position.x-=speed;
                    break;
                }
                case "r":{
                    this.position.x+=speed;
                    break;
                }
                case "u":{
                    this.position.y-=speed;
                    break;
                }
                case "d":{
                    this.position.y+=speed;
                    break;
                }
            }
        }
        this.draw();
    }

    collisions(raposas,i){
        var positionsRaposas = raposas.getPositions();
        for(var positionRaposa of positionsRaposas){
            if(this.collision(positionRaposa,i)==true){
                return true;
            }
        }
        return false;
    }

    morteLoad(i){
        this.morteI = i;
        this.morte  = true;
        this.cor    = "#00FF00";
    }


    collision(positionRaposa,i){
        if(this.morte==false){
            var tamanho = 25;

            if(this.position.x+tamanho < 1){ this.morteLoad(i); return true; }
            if(this.position.x        >500){ this.morteLoad(i); return true; }
            if(this.position.y+tamanho < 1){ this.morteLoad(i); return true; }
            if(this.position.y        >500){ this.morteLoad(i); return true; }


            if(positionRaposa.x + tamanho <= this.position.x){ return false; }
            if(positionRaposa.x   >= this.position.x+tamanho){ return false; }
            if(positionRaposa.y+tamanho   <= this.position.y){ return false; }
            if(positionRaposa.y   >= this.position.y+tamanho){ return false; }

            this.morteLoad(i);
            return true;
        }else{
            return false;
        }
    }


}