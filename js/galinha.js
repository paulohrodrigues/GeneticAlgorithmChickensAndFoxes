
/**
* Essa é a classe de abstração do objeto "Galinha"
*
* @class Galinha
* @constructor
*/

class Galinha{
    
    
    /**
    * Esse é o Método construtor da classe 
    *
    * @method constructor
    * @param {Object} ctx contexto 2d do canvas html5
    * @param {Object} position posição inicial da galinha x e y
    * @param {number} position.x posição x
    * @param {number} position.y posição y
    * @param {Array} positions lista de posições na qual a galinha terá que andar: l - left; r - right; u - up; d - down. Ex.: ["d","d","l","r","u"]
    * @return {any} Retorna o próprio objeto
    */
    
    constructor(ctx,position,positions){
        this.img=new Image();
        this.img.src="./img/galinha.png";
        this.cor        = "#FF0000";  
        this.deadI     = 20;
        this.dead      = false;
        this.ctx        = ctx;
        this.positions  = positions;
        this.position   = position;
        this.draw();
    }



    /**
    * Desenha a "galinha" na tela
    *
    * @method draw
    * @return {any} sem retorno
    */

    draw(){
        // this.ctx.fillStyle=this.cor;

        this.ctx.drawImage(this.img,this.position.x,this.position.y,25,25);

        // this.ctx.fillRect(this.position.x,this.position.y,25,25);
    }

    /**
    * Método que controla o movimento da "galinha" 
    *
    * @method translate
    * @param {number} speed velocidade 
    * @param {number} i posição que representa a fatia de tempo de vida da galinha
    * @return {any} Sem retorno
    */

    translate(speed,i){
        if(this.dead==true){
            // console.log("morto");
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

    /**
    * Método que verifica se a galinha está colidindo com alguma raposa 
    *
    * @method collisions
    * @param {Object} raposas objeto que contem as posições de todas as raposas
    * @param {number} i posição que representa a fatia de tempo de vida da galinha
    * @return {Boolean} rotorna true se colidir, false se não colidir
    */

    collisions(raposas,i){
        var positionsRaposas = raposas.getPositions();
        for(var positionRaposa of positionsRaposas){
            if(this.collision(positionRaposa,i)==true){
                return true;
            }
        }
        return false;
    }

    /**
    * Método de carregamento para caracterirar a morte da galinha 
    *
    * @method deadLoad
    * @param {number} i posição que representa a fatia de tempo de vida da galinha
    * @return {any} sem retorno
    */

    deadLoad(i){

        this.deadI = i-1;
        this.dead  = true;
        this.cor    = "#00FF00";
        console.log("Morreu com "+this.deadI+" de movimentação");
    }


    /**
    * Método que verifica se a galinha está colidindo com alguma raposa em específico
    *
    * @method collision
    * @param {Object} positionRaposa objeto que contem a posição x e y de uma determinada raposa
    * @param {number} positionRaposa.x posição x da raposa
    * @param {number} positionRaposa.y posição y da raposa
    * @param {number} i posição que representa a fatia de tempo de vida da galinha
    * @return {Boolean} rotorna true se colidir, false se não colidir
    */

    collision(positionRaposa,i){
        if(this.dead==false){
            var tamanho = 25;

            if(this.position.x+tamanho < 1){ this.deadLoad(i); return true; }
            if(this.position.x        >500){ this.deadLoad(i); return true; }
            if(this.position.y+tamanho < 1){ this.deadLoad(i); return true; }
            if(this.position.y        >500){ this.deadLoad(i); return true; }


            if(positionRaposa.x + tamanho <= this.position.x){ return false; }
            if(positionRaposa.x   >= this.position.x+tamanho){ return false; }
            if(positionRaposa.y+tamanho   <= this.position.y){ return false; }
            if(positionRaposa.y   >= this.position.y+tamanho){ return false; }

            this.deadLoad(i);
            return true;
        }else{
            return false;
        }
    }


}