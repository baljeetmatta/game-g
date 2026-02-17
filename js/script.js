//1. Project Setup
//Html->canvas, javascript reference, canvas basic,
//obtain the context
//2. Player
//3. Player Movement ->y
//4. Gravity
//5. Full Movements left->right->up->down(already)
//6. Screen Restrict
//7. Platform
//8. Multiple Platforms  and conditions
//9.Scrolling
//10 Base Platform pit fall
//11, Graphics
//12. Win Condition
//offset


let offset=0;
let count=0;
const totalimages=6;
const backImage=new Image();
const hillsImage=new Image();
const platformBase=new Image();
const platformSmall=new Image();
const playerStandRight=new Image();
playerStandRight.addEventListener("load",()=>{
    count++;    
    if(count==totalimages)
        CreateObjects();
})

const playerRunRight=new Image();
playerRunRight.addEventListener("load",()=>{
    count++;    
    if(count==totalimages)
        CreateObjects();
})
platformBase.addEventListener("load",()=>{
    count++;    
    if(count==totalimages)
        CreateObjects();
})
platformSmall.addEventListener("load",()=>{
    count++;    
    if(count==totalimages)
        CreateObjects();
})



backImage.addEventListener("load",()=>{
    count++;    
    if(count==totalimages)
        CreateObjects();
})
hillsImage.addEventListener("load",()=>{
    count++;    
    if(count==totalimages)
        CreateObjects();
})

backImage.src="./images/background.png";
platformBase.src="./images/platform.png";
hillsImage.src="./images/hills.png";
platformSmall.src="./images/platformSmallTall.png";
playerStandRight.src="./images/spriteStandRight.png";
playerRunRight.src="./images/spriteRunRight.png";

const gravity = 0.5;
const speed = 5;
const gameCanvas = document.querySelector("#gameCanvas");
gameCanvas.width = window.innerWidth;
gameCanvas.height = window.innerHeight;
gameCanvas.style.background = "yellow";
const keys = {
    right: false,
    left: false
}
const context = gameCanvas.getContext("2d");

// class Player {
//     constructor() {
//         this.position = {
//             x: 150,
//             y: 450
//         }
//         this.velocity = {
//             x: 0,
//             y: speed
//         }
//         this.width = 20;
//         this.height = 20;
//     }
//     draw() {
//         context.fillStyle = "black";
//         context.fillRect(this.position.x, this.position.y, this.width, this.height);

//     }
//     update() {
//         this.position.y += this.velocity.y;
//         this.position.x += this.velocity.x;
//         if (this.position.y + this.height + this.velocity.y >= gameCanvas.height)
//           {  this.velocity.y = 0;
//                 window.location.reload();

//           }
//         else {
//             this.velocity.y += gravity;

//         }


//         this.draw();
//     }
// }


class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 450
        }
        this.velocity = {
            x: 0,
            y: speed
        }
        this.width = 66;
        this.height = 150;
        this.frames=0;
        this.image=playerStandRight;
        this.cropWidth=177;

    }
    draw() {
        this.frames++;
        if(this.frames>59 &&this.image==playerStandRight)
            this.frames=0;

        if(this.frames>29 &&this.image==playerRunRight)
            this.frames=0;

       // context.fillStyle = "black";
      //  context.fillRect(this.position.x, this.position.y, this.width, this.height);
        context.drawImage(
            this.image,
            this.cropWidth*this.frames,
            0,this.cropWidth,
            400,
            this.position.x,
            this.position.y,
            this.width,
            this.height)
    }
    update() {
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
        if (this.position.y + this.height + this.velocity.y >= gameCanvas.height)
          {  this.velocity.y = 0;
                window.location.reload();

          }
        else {
            this.velocity.y += gravity;

        }


        this.draw();
    }
}

// class Platform {
//     constructor(x, y, width, height) {
//         this.position = {
//             x: x,
//             y: y
//         }
//         this.width = width;
//         this.height = height;

//     }
//     draw() {
//         context.fillStyle = "red";
//         context.fillRect(this.position.x, this.position.y, this.width, this.height);

//     }
// }

class Platform {
    constructor(x, y, image) {
        this.position = {
            x: x,
            y: y
        }
        this.width = image.width;
        this.height = image.height;
        this.image=image;

    }
    draw() {
        //context.fillStyle = "red";
        //context.fillRect(this.position.x, this.position.y, this.width, this.height);
        context.drawImage(this.image,this.position.x,this.position.y);

    }
}


let player;
let platforms=[];
function CreateObjects()
{


 player = new Player();
player.draw();

//const platform = new Platform(350, gameCanvas.height - 160, 40, 100);
//const platform1=new Platform(550,gameCanvas.height - 160, 40, 100);
// const platform2=new Platform(0,gameCanvas.height - 60, 660);
// const platform3=new Platform(730,gameCanvas.height - 60, 660, 60);
// const platform4=new Platform(1460,gameCanvas.height - 60, 660, 60);
// let platforms=[platform2,platform3,platform4];

const platform = new Platform(200, gameCanvas.height - platformSmall.height-40, platformSmall);

const platform2=new Platform(0,gameCanvas.height - platformBase.height, platformBase);
const platform3=new Platform(680,gameCanvas.height - platformBase.height, platformBase);
const platform4=new Platform(1400,gameCanvas.height - platformBase.height, platformBase);
platforms.push(platform);
platforms.push(platform2);
platforms.push(platform3);
platforms.push(platform4);  
animate();

}

//platform.draw();

function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    context.drawImage(backImage,0-offset,0);
    context.drawImage(hillsImage,0-offset,0);


    platforms.forEach((platform) => {
        platform.draw();
    });

    player.update();
    if(keys.right)
    {
        player.image=playerRunRight;
        player.width=127;
        player.cropWidth=340;

        

    }
    else{
         player.image=playerStandRight;
        player.width=66;
        player.cropWidth=177;

    }

    if (keys.right && player.position.x <= 950)
        player.velocity.x = speed;
    else if (keys.left && player.position.x >= 150)
        player.velocity.x = -speed;
    else

        {
        player.velocity.x = 0;
                if(keys.right)
                {
                    offset+=speed;
                    platforms.forEach((platform)=>{

                        platform.position.x-=speed;
                });
            }
                else  if(keys.left)
                {
                    offset-=speed;
                    platforms.forEach((platform)=>{

                        platform.position.x+=speed;
                });
                }
        }

    platforms.forEach((platform)=>{


          if (
        player.position.x + player.width >= platform.position.x
        && player.position.x + player.width <= platform.position.x + platform.width
        && player.position.y <= platform.position.y + platform.height
        && player.position.y + player.height >= platform.position.y
    )
        player.velocity.x = 0;

    if (player.position.x + player.width >= platform.position.x
        && player.position.x <= platform.position.x + platform.width
        &&
        player.position.y + player.height + player.velocity.y >= platform.position.y

        &&
        player.position.y + player.height <= platform.position.y
    )
        player.velocity.y = 0;


    })

  console.log(offset);
    if(offset+1200>2000)

        console.log("You Win");
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


addEventListener("keydown", (e) => {
    //console.log(e);
    if (e.key == "ArrowRight")
        keys.right = true;
    //player.velocity.x=speed;
    if (e.key == "ArrowLeft")
        keys.left = true;
    // player.velocity.x=-speed;
    if (e.key == "ArrowUp")
        player.velocity.y = -12;
})

addEventListener("keyup", (e) => {
    //console.log(e);
    if (e.key == "ArrowRight")
        keys.right = false;
    // player.velocity.x=0;
    if (e.key == "ArrowLeft")
        keys.left = false;
    //player.velocity.x=0;
})

//animate();

