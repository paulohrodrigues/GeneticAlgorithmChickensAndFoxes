/**
* Essa é a classe de abstração do objeto "Raposa"
*
* @class Raposa
* @constructor
*/
class Raposa{

    /**
    * Esse é o Método construtor da classe 
    *
    * @method constructor
    * @param {Object} ctx contexto 2d do canvas html5
    * @return {any} Retorna o próprio objeto
    */

    constructor(ctx){
        this.img=new Image();
        this.img.src="./img/raposa.png";
        this.ctx=ctx;
        this.positions=[];
        for(var j =0; j<parseInt(document.getElementById("raposas").value);j++){
            this.positions.push({"x":Math.floor((Math.random() * 21))*25,"y":Math.floor((Math.random() * 21))*25});
        }
    }

    /**
    * Desenha todas as "Raposas" na tela
    *
    * @method draw
    * @return {any} sem retorno
    */

    draw(){
        for(var raposa of this.positions){
            // this.ctx.fillStyle="#000000";
            this.ctx.drawImage(this.img,raposa.x,raposa.y,25,25);
            // this.ctx.fillRect(raposa.x,raposa.y,25,25);
        }
    }

    /**
    * Método que retorno todas as posições das raposas
    *
    * @method getPositions
    * @return {Array} retorno todas as posições de 0..n, onde cada index é composto por um objeto no formato {x:number,y:number}
    */
    getPositions(){
        return this.positions;
    }

}