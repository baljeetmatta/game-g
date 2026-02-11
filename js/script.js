//1. Project Setup
//Html->canvas, javascript reference, canvas basic,
//obtain the context
//2. Player
//3. Player Movement ->y
//4. Gravity
//5. Full Movements left->right->up->down(already)
//6. Screen Restrict
//7. Platform

const gravity=0.5;
const speed=2;
const gameCanvas=document.querySelector("#gameCanvas");
gameCanvas.width=window.innerWidth;
gameCanvas.height=window.innerHeight;
gameCanvas.style.background="yellow";
const keys={
    right:false,
    left:false
}
const context=gameCanvas.getContext("2d");

class Player{
    constructor(){
        this.position={
            x:150,
            y:450
        }
        this.velocity={
            x:0,
            y:speed
        }
        this.width=20;
        this.height=20;
    }
    draw()
    {
        context.fillStyle="black";
        context.fillRect(this.position.x,this.position.y,this.width,this.height);

    }
    update()
    {
        this.position.y+=this.velocity.y;
        this.position.x+=this.velocity.x;
        if(this.position.y+this.height+this.velocity.y>=gameCanvas.height)
            this.velocity.y=0;
        else
        {
            this.velocity.y+=gravity;

        }
        

        this.draw();
    }
}
class Platform{
    constructor(x,y,width,height)
    {
        this.position={
            x:x,
            y:y
        }
        this.width=width;
        this.height=height;

    }
    draw()
    {
            context.fillStyle="red";
            context.fillRect(this.position.x,this.position.y,this.width,this.height);

    }
}
const player=new Player();
player.draw();

const platform=new Platform(350,gameCanvas.height-100,40,100);
//  const platform=new Platform(350,gameCanvas.height-150,140,20);
//platform.draw();

function animate()
{
    requestAnimationFrame(animate);
    context.clearRect(0,0,window.innerWidth,window.innerHeight);
    
platform.draw();
    player.update();
    
    if(keys.right && player.position.x<=950)
        player.velocity.x=speed;
    else if(keys.left && player.position.x>=150)
        player.velocity.x=-speed;
    else
        player.velocity.x=0;

    if(
        player.position.x+player.width>=platform.position.x 
        && player.position.x+player.width<=platform.position.x+platform.width
        && player.position.y<=platform.position.y+platform.height
    && player.position.y+player.height>=platform.position.y
)
        player.velocity.x=0;

            if( player.position.x+player.width>=platform.position.x 
        && player.position.x<=platform.position.x+platform.width
       &&
                player.position.y+player.height+player.velocity.y>=platform.position.y
            
            &&
            player.position.y+player.height<=platform.position.y
            )
                player.velocity.y=0;

}

// addEventListener("keydown",(e)=>{
// //console.log(e);
// if(e.key=="ArrowRight")
//     player.velocity.x=speed;
// if(e.key=="ArrowLeft")
//     player.velocity.x=-speed;
// if(e.key=="ArrowUp")
//     player.velocity.y=-12;
// })

// addEventListener("keyup",(e)=>{
// //console.log(e);
// if(e.key=="ArrowRight")
//     player.velocity.x=0;
// if(e.key=="ArrowLeft")
//     player.velocity.x=0;
// })


addEventListener("keydown",(e)=>{
//console.log(e);
if(e.key=="ArrowRight")
    keys.right=true;
    //player.velocity.x=speed;
if(e.key=="ArrowLeft")
    keys.left=true;
   // player.velocity.x=-speed;
if(e.key=="ArrowUp")
    player.velocity.y=-12;
})

addEventListener("keyup",(e)=>{
//console.log(e);
if(e.key=="ArrowRight")
    keys.right=false;
   // player.velocity.x=0;
if(e.key=="ArrowLeft")
    keys.left=false;
    //player.velocity.x=0;
})

animate();

