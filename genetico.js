class Genetico{

    constructor(ctx){
        this.i=0;
        this.ctx=ctx;
        this.populacaoGalinha=[];
        this.raposas = new Raposa(ctx);
        this.init();
    }

    init(){
        var possible = "lrdu";
        for(let i =0;i<20;i++){
            var positions = [];
            for(let j =0;j<20;j++){
                positions.push(possible[Math.floor((Math.random() * 4))]);
            }
            this.populacaoGalinha.push(new Galinha(this.ctx,{"x":200,"y":200},positions));
        }
    }
   
    play(){
        this.i=0;
        this.loop();
    }

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

    crossing(){
        this.populacaoGalinha = this.populacaoGalinha.sort(function(a,b) {
            return a.morteI > b.morteI ? -1 : a.morteI < b.morteI ? 1 : 0;
        });
        var novasGalinhas = [];
        for(var i=0;i<10;i++){

            // this.populacaoGalinha[i].cor    = "#FF0000"; 
            // this.populacaoGalinha[i].morteI = 20;
            // this.populacaoGalinha[i].morte  = false;

            novasGalinhas.push(this.populacaoGalinha[i]);
        }
        this.auxCrossing(novasGalinhas);
    }


    auxCrossing(novasGalinhas){
        this.populacaoGalinha=[];
        for(var galinha1 of novasGalinhas){
            for(var galinha2 of novasGalinhas){
                this.joinCrossing(galinha1,galinha2);
            }
        }
        this.play();
    }


    joinCrossing(galinha1,galinha2){
        
        var positions = [];
        for(let i=0;i<10;i++){
            positions.push(galinha1.positions[i]);
        }
        for(let j=10;j<20;j++){
            positions.push(galinha2.positions[j]);
        }

        this.populacaoGalinha.push(new Galinha(this.ctx,{"x":200,"y":200},positions));
    }

}