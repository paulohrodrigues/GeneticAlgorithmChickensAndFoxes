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
        this.geracao=0;
        this.i=0;
        this.ctx=ctx;
        this.populacaoGalinha=[];
        this.raposas;
        this.grafico = new Grafico();
        this.evolucaoMaxima=false;
        this.sizeDead=0;
    }


    /**
    * Método que inicia a população de galinhas
    *
    * @method init
    * @return {any} Sem retorno
    */

    init(){
        var possible = "lrdu";
        for(let i =0;i<parseInt(document.getElementById("galinhas").value);i++){
            var positions = [];
            for(let j =0;j<20;j++){
                positions.push(possible[Math.floor((Math.random() * 4))]);
            }
            this.populacaoGalinha.push(new Galinha(this.ctx,{"x":250,"y":250},positions));
        }
    }

    /**
    * Método que inicia a simulação
    *
    * @method play
    * @return {any} Sem retorno
    */
   
    play(){
        this.raposas = new Raposa(ctx);
        this.init();
        this.showElement();
        this.i=0;
        this.loop(parseInt(document.getElementById("velocidade").value));
    }


    /**
    * Método que mostra os dados de gerações e quantidade de galinhas na tela
    *
    * @method showElement
    * @return {any} Sem retorno
    */

    showElement(){
        document.getElementById("geracao").innerHTML=this.geracao;
        document.getElementById("galinhas").value=this.populacaoGalinha.length;
    }


    /**
    * Método que controla o loop de interações e a condição de parada 
    *
    * @method loop
    * @return {any} Sem retorno
    */

    loop(velocidade){
        var self = this;
        setTimeout(()=>{
            self.ctx.clearRect(0,0,500,500);
            
            self.raposas.draw();
            for(var galinha of self.populacaoGalinha){
                galinha.translate(25,self.i);
                if(galinha.collisions(self.raposas,self.i)==true){
                    // console.log("colidiu");
                    this.sizeDead++;
                }
            }

            self.i++;
            if(self.i>=20){
                
                self.crossing();
                // alert("Nova Geração");
            }else{
                self.loop(velocidade);  
            }
            
        },velocidade);
    }


    /**
    * Método que separa os indivíduos mais qualificados para o cruzamento
    *
    * @method crossing
    * @return {any} Sem retorno
    */

    crossing(){
        this.updateGrafico();
        this.populacaoGalinha = this.populacaoGalinha.sort(function(a,b) {
            return a.morteI > b.morteI ? -1 : a.morteI < b.morteI ? 1 : 0;
        });
        var novasGalinhas = [];
        var i=0;
        for(var populacaoGalinhaLocal of this.populacaoGalinha){
            console.log("está adicionando");
            // console.log("existe com "+populacaoGalinhaLocal.deadI);
            if(populacaoGalinhaLocal.deadI==20){
                console.log("entrou com "+populacaoGalinhaLocal.deadI);

                novasGalinhas.push(populacaoGalinhaLocal);
                i++;
            }
            if(i>=20){
                break;
            }
        }
        console.log("Vai Cruzar");
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
        for(let galinha1 of novasGalinhas){
            console.log("Apta a cruzar com "+galinha1.deadI);
            for(let galinha2 of novasGalinhas){
                this.joinCrossing(galinha1,galinha2);
            }
        }
        var max = Math.ceil(this.populacaoGalinha.length*0.1);
        for(let i=0;i<max;i++){
            // console.log("Apta a cruzar com "+galinha1.deadI);
            for(let j=0;j<max;j++){
                this.joinCrossing(this.populacaoGalinha[i],this.populacaoGalinha[j]);
            }
        }
        this.sizeDead=0;
        this.removeEquals();
        this.i=0;
        this.loop(parseInt(document.getElementById("velocidade").value));
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
        var corte = this.mutation();
        var positions = [];
        for(let i=0;i<corte;i++){
            positions.push(galinha1.positions[i]);
        }
        for(let j=corte;j<20;j++){
            positions.push(galinha2.positions[j]);
        }

        this.populacaoGalinha.push(new Galinha(this.ctx,{"x":250,"y":250},positions));
    }



        /**
    * Método que remove os individuos repetidos
    *
    * @method removeEquals
    * @return {any} Sem retorno
    */
    
    removeEquals(){
        Array.prototype.remove = function(start) {
            this.splice(start, 1);
            return this;
        }
     
        for(let key1 in this.populacaoGalinha){
            for(let key2 in this.populacaoGalinha){
                if(key1 != key2){
                    try{
                        if(JSON.stringify(this.populacaoGalinha[key1].positions) == JSON.stringify(this.populacaoGalinha[key2].positions)){
                            this.populacaoGalinha.remove(key1);
                        }
                    }catch(e){
                        // console.log("Erro");
                    }
                }
            }
        }
    }


    /**
    * Método que faz a atualização do grafico
    *
    * @method updateGrafico
    * @return {any} Sem retorno
    */
    updateGrafico(){
        var soma =0;
        for(var galinha of this.populacaoGalinha){
            soma+=galinha.deadI;
        }

        this.geracao++;
        this.showElement();
        this.grafico.update("Geração "+this.geracao,soma/this.populacaoGalinha.length);
        if(soma/this.populacaoGalinha.length == 20 && !this.evolucaoMaxima){
            this.evolucaoMaxima=true;
            alert("A geração "+this.geracao+" atingiu a evolução máxima!");
        }
    }

    /**
    * Método que retorna um valor aleatório dentro de um intervalo.
    *
    * @method getRandomInt
    * @param {number} min valor minimo do intervalo
    * @param {number} max valor máximo do intervalo
    * @return {number} retorna um valor inteiro aleatório no intervalo espedicifocado nos parametros
    */

    getRandomInt(min, max) {
        max+=1;
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }


    /**
    * Método que faz mutação. Caso algum individuo tenha morrido então faz a mutação retornando um valor entre 2 e 18, 
    * caso não seja necessario mutação o retorno vai ser 10
    *
    * @method mutation
    * @return {any} retorna o valor de corte do cruzamento
    */

    mutation(){
        if(this.sizeDead>=1){
            console.log("Fez mutação!");
            this.sizeDead=0;
            return this.getRandomInt(2,18);
        }
        return 10;
    }


}