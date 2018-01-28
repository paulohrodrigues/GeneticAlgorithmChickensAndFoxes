/**
* Essa classe é onde está implemetada a lógica do algoritmo genético
*
* @class Genetico
* @constructor
*/

class Genetico{

    /**
    * Esse é o Método construtor da classe 
    *
    * @method constructor
    * @param {Object} ctx contexto 2d do canvas html5
    * @return {any} Retorna o próprio objeto
    */

    constructor(ctx){
        this.i=0;
        this.ctx=ctx;
        this.populacaoGalinha=[];
        this.raposas = new Raposa(ctx);
        this.init();
    }


    /**
    * Método que inicia a população de galinhas
    *
    * @method init
    * @return {any} Sem retorno
    */

    init(){
        var possible = "lrdu";
        for(let i =0;i<100;i++){
            var positions = [];
            for(let j =0;j<20;j++){
                positions.push(possible[Math.floor((Math.random() * 4))]);
            }
            this.populacaoGalinha.push(new Galinha(this.ctx,{"x":250,"y":250},positions));
        }
    }

    /**
    * Método que inicia o ciclo de vida das galinhas
    *
    * @method play
    * @return {any} Sem retorno
    */
   
    play(){
        this.i=0;
        this.loop();
    }


    /**
    * Método que controla o loop de interações e a condição de parada 
    *
    * @method loop
    * @return {any} Sem retorno
    */

    loop(){
        var self = this;
        setTimeout(()=>{
            self.ctx.clearRect(0,0,500,500);
            
            self.raposas.draw();
            for(var galinha of self.populacaoGalinha){
                galinha.translate(25,self.i);
                if(galinha.collisions(self.raposas,self.i)==true){
                    // console.log("colidiu");
                }
            }

            self.i++;
            if(self.i>=20){
                
                self.crossing();
                // alert("Nova Geração");
            }else{
                self.loop();  
            }
            
        },1000);
    }


    /**
    * Método que separa os indivíduos mais qualificados para o cruzamento
    *
    * @method crossing
    * @return {any} Sem retorno
    */

    crossing(){
        this.populacaoGalinha = this.populacaoGalinha.sort(function(a,b) {
            return a.morteI > b.morteI ? -1 : a.morteI < b.morteI ? 1 : 0;
        });
        var novasGalinhas = [];
        for(var i=0;i<10;i++){
            novasGalinhas.push(this.populacaoGalinha[i]);
        }
        this.auxCrossing(novasGalinhas);
    }

    /**
    * Método que faz a preparação do cruzamento dos indivíduos mais qualificados
    *
    * @method auxCrossing
    * @param {Array} novasGalinhas lista das galinhas(indivíduos) mais qualificadas para o cruzamento 
    * @return {any} Sem retorno
    */

    auxCrossing(novasGalinhas){
        this.populacaoGalinha=[];
        for(var galinha1 of novasGalinhas){
            for(var galinha2 of novasGalinhas){
                this.joinCrossing(galinha1,galinha2);
            }
        }
        this.play();
    }


    /**
    * Método que recebe duas galinhas e faz o cruzamento das mesmas.
    *
    * @method auxCrossing
    * @param {Object} galinha1 galinha 1 
    * @param {Object} galinha2 galinha 2
    * @return {any} Sem retorno
    */

    joinCrossing(galinha1,galinha2){
        
        var positions = [];
        for(let i=0;i<10;i++){
            positions.push(galinha1.positions[i]);
        }
        for(let j=10;j<20;j++){
            positions.push(galinha2.positions[j]);
        }

        this.populacaoGalinha.push(new Galinha(this.ctx,{"x":250,"y":250},positions));
    }

}