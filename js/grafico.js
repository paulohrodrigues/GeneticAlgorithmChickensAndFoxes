class Grafico{
    constructor(){
        this.ctx = document.getElementById("myChart").getContext('2d');
        this.x=[];
        this.y=[];
    }



    update(addx,addy){
        this.x.push(addx);
        this.y.push(addy);
        this.draw();
    }
    
    draw(){

        var myChart = new Chart(this.ctx, {
            type: 'line',
            data: {
                labels: this.x,
                datasets: [{
                    label: 'Evolução Média',
                    data: this.y,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });

    }





}