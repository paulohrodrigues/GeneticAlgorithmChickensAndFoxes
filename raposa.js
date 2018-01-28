class Raposa{
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

    draw(){
        for(var raposa of this.positions){
            this.ctx.fillStyle="#000000";
            this.ctx.fillRect(raposa.x,raposa.y,25,25);
        }
    }

    getPositions(){
        return this.positions;
    }

}