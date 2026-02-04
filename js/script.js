const gameCanvas = document.querySelector("#gameCanvas");
gameCanvas.width = window.innerWidth;
gameCanvas.height = window.innerHeight;
gameCanvas.style.background = "yellow";

const context = gameCanvas.getContext("2d");
context.fillStyle = "red";

// context.fillRect(100,100,50,100);
// context.fillRect(200,100,50,100);
// context.strokeRect(300,100,50,100);
// context.beginPath();

// context.arc(100,100,50,0,Math.PI*2);
// context.moveTo(200,200);
// context.lineTo(200,50);
// context.lineTo(300,300);



// context.stroke();
// context.closePath();

// context.font="50px Arial"
// context.fillText("Hello",200,200);
// context.strokeText("Hello",300,200);

class Circle {
    x = 10;
    constructor(x, y, radius,speed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed=speed;
    }
    // display(x, y, radius) {
    //     this.x = x;
    //     this.y = y;
    //     this.radius = radius;
    //     //console.log(this.x);

    // }
    draw() {
        context.beginPath();
        context.arc(this.x+this.speed, this.y+this.speed, this.radius, 0, Math.PI * 2);
        context.stroke();
        context.closePath();
    }
}
//Circle c; Compile time
//Circle *c=new Circle(); run Time
//Java ->Runtime
//Circle c=new Circle();
// let c = new Circle(100,100,50);
// //c.display(100,100,50);
// c.draw();

// let c1 = new Circle(200,200,50);
// //c1.display(200,200,50);
// c1.draw();
//c.display();

// let circles=[];
// for(i=1;i<=10;i++)
// {
//    // let c=new Circle(100+i*10,100+i*10,50);

//    let x=Math.random()*window.innerWidth-50;
//    let y=Math.random()*window.innerHeight;
//    let c=new Circle(x,y,50);

//     circles.push(c);
// }

// circles.forEach((item)=>{
//     item.draw();

// })

let c=new Circle(100,100,50,5);
c.draw();

// console.log("First");
// setTimeout(test,0);
// console.log("Second");
// function test()
// {
//     console.log("Test called");
// }
//setInterval(animate,100);

function animate()
{
    requestAnimationFrame(animate);

    context.clearRect(0,0,window.innerWidth,window.innerHeight);

    c.speed+=1;

    c.draw();
}

animate();


