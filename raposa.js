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
        this.ctx=ctx;

        this.positions=[
            {x:25,y:50},
            {x:75,y:50},
            {x:25,y:225},
            {x:100,y:150},
            {x:25,y:100},
            {x:125,y:125},
            {x:200,y:150},
            {x:250,y:300},
            {x:250,y:25},
            {x:400,y:425},
            {x:350,y:325},
            {x:175,y:175},
            {x:275,y:275}
        ];
    }


    /**
    * Desenha todas as "Raposas" na tela
    *
    * @method draw
    * @return {any} sem retorno
    */

    draw(){
        for(var raposa of this.positions){
            this.ctx.fillStyle="#000000";
            this.ctx.fillRect(raposa.x,raposa.y,25,25);
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