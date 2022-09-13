class Car {
    constructor(x,y,width,height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.speed=0;
        this.acceleration=0.2;
        this.maxSpeed=3;
        this.friction=0.05;
        this.angle=0;

        this.sensor = new Sensor(this);
        this.controls = new Controls();
    }

    update(){
        this.#move();
        this.sensor.update();
    }

    #move() {
        if (this.controls.forward) {
            this.speed+=this.acceleration;
        }
        if (this.controls.reverse) {
            this.speed-=this.acceleration;
        }

        if (this.speed>this.maxSpeed) { //caps to maxspeed
            this.speed=this.maxSpeed;
        }

        if (this.speed<-this.maxSpeed/2) { // caps to maxspeed but for reverse
            this.speed=-this.maxSpeed/2
        }

        if (this.speed > 0) { //stops car
            this.speed -= this.friction;
        }

        if (this.speed < 0) {
            this.speed += this.friction;
        }

        if (Math.abs(this.speed)<this.friction) {//absolute stop
            this.speed = 0;
        }

        if(this.speed!=0) {
            const flip=this.speed>0?1:-1; //makes sure reverse/forward is consistent with turning
            if (this.controls.left) {
                this.angle+=0.03*flip; //based on unit circle
            }
        
            if(this.controls.right) {
                this.angle-=0.03*flip;
            }
        }

        

        this.x-=Math.sin(this.angle)*this.speed;
        this.y-=Math.cos(this.angle)*this.speed;

    }

    draw(ctx) {
        ctx.save();//for steering
        ctx.translate(this.x,this.y); 
        ctx.rotate(-this.angle);


        ctx.beginPath();
        ctx.rect(
            -this.width/2, //x of the car is center
            -this.height/2,
            this.width,
            this.height
        );
        ctx.fill();

        ctx.restore();

        this.sensor.draw(ctx);
    }
}