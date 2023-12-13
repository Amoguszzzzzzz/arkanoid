const canvas = document.querySelector('#canvas');
const screenwidth = window.innerWidth
const screenheight = window.innerHeight

//
const width = 800
const height = 1000
const leftborder = screenwidth/2 - width/2
const rightborder = leftborder+width-148
const actualrightborder = rightborder + 148
//

if (canvas){

let ctx = canvas.getContext('2d');
canvas.width = screenwidth
canvas.height = screenheight
ctx.strokeStyle = "black"

const ram = new Image(); // Create new img element
ram.src = "images/ram.png"; // Set source path

//Classes

class Block {
    constructor(w,h,xc,yc,c){
        this.width = w
        this.height = h
        this.x = xc
        this.y = yc
        this.color = c
        this.hit = false
    }
    draw() {
        let xline1 = this.x + this.width
        let xline2 = this.x + this.width
        let yline1 = this.y
        let yline2 = this.y + this.height
        if (this.hit == false) {
            ctx.fillStyle = this.color
            ctx.lineWidth = 2;
            
            ctx.fillRect(this.x,this.y,this.width,this.height)
            // ctx.drawImage(ram,this.x,this.y)
            /*ctx.beginPath()
            ctx.moveTo(this.x,this.y)
            
            ctx.lineTo(xline1, yline1)
            ctx.lineTo(xline2, yline2)
            ctx.lineTo(this.x, this.y + this.height)
            ctx.lineTo(this.x, this.y)
            ctx.closePath()
            ctx.stroke()*/
            
        } 
    }
    drawoutlines(){
        if (this.hit == false) {
            ctx.drawImage(ram,this.x,this.y)
        }
    }

}

class healthblock {
    constructor(w,h,xc,yc,c){
        this.width = w
        this.height = h
        this.x = xc
        this.y = yc
        this.color = c
        this.used = false
    }
    draw() {
        if (this.used == false) {
            ctx.fillStyle = this.color
            ctx.fillRect(this.x,this.y,this.width,this.height)
        } 
    }

}

class BlockX {
}
class blockY {
}


class Ball {
    constructor(r,x,y,c){
        this.radie = r
        this.x = x
        this.y = y
        this.color = c
        this.yvelocity = 1.25
        this.xvelocity = 0
    }
    draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.radie,0,360)
        //ctx.fillRect(this.x, this.y, 50, 50)
        ctx.fill()
        ctx.closePath()
    }
    update() {
        this.x = this.x + this.xvelocity
        this.y = this.y + this.yvelocity
        this.draw()

    }

}







const xmenuoptions = [leftborder + 260, leftborder + 125, leftborder + 260];
const ymenuoptions = [370, 480, 585]



const blockwidth = 50
const blockheight = 25
let gapwidth = 50
const blockscalcrow = (width - gapwidth*2) / blockwidth
const blockstarty = 150
const gap = 0
let blocksperrow = Math.round((width-2*gapwidth)/(blockwidth+gap))
let remainder = (width-2*gapwidth)%(blockwidth+gap)
if (remainder != 0) {
    blocksperrow = blocksperrow - 1
    let difference = (width - gapwidth*2) - (blockwidth+gap)*blocksperrow
    let newgap = difference/2
    gapwidth = gapwidth + newgap
}
const blocks = [];
const colors = ["orange", "red", "yellow", "green", "blue", "purple", "pink"]

let lasty = 150
let lastx = leftborder + gapwidth
const MaxY = 300
let xv = 0
const startgapwidth = gapwidth
const startY = lasty

while (lasty <= MaxY+150) {
    while (lastx <= actualrightborder - gapwidth - blockwidth) {
        let block = new Block(blockwidth,blockheight,lastx,lasty,"green")
        blocks.push(block);
        lastx+= blockwidth+gap
        block.color = colors[xv % colors.length]
    }
    lasty = lasty + blockheight + gap
    lastx = leftborder + gapwidth
    xv+= 1

}

 //IMAGES
ctx.fillStyle = 'blue';
const xwidth = screenwidth /2 - 400

let xskateboard = screenwidth / 2 - 74
ctx.fillRect(xwidth, 0, width, height);

const img = new Image(); // Create new img element
img.src = "images/frame.png"; // Set source path

const arrow = new Image(); // Create new img element
arrow.src = "images/arrow.png"; // Set source path

const skateboard = new Image(); // Create new img element
skateboard.src = "images/Skatebard.png"; // Set source path

const mainmenu = new Image(); // Create new img element
mainmenu.src = "images/Mainmenu.png"; // Set source path
const powerupsinfo = new Image(); // Create new img element
powerupsinfo.src = "images/Powerups.png"; // Set source path

const balls = [];
let ball = new Ball(10,xskateboard + 70,650,"blue")

class Player {
    constructor(w,h,x,y,c){
        this.width = w
        this.height = h
        this.x = x
        this.y = y
        this.color = c
    }
    drawImage(){
        ctx.drawImage(skateboard,this.x,this.y)
    }
}
const player1 = new Player(148,50,xskateboard, 800)

document.addEventListener('keydown', (event) => {
    var name = event.key;

    if (name == "ArrowLeft"){
        player1.x = player1.x - 25
        if (player1.x <leftborder){
            player1.x = leftborder
        }
    }
    if (name == "ArrowRight"){
        player1.x = player1.x + 25
        if (player1.x >rightborder){
            player1.x = rightborder
        }
    }
  }, false);
let u = 0
let playerstarthealth = 5
let playerhealth = 5

const c38 = new Image(); // Create new img element
c38.src = "images/C38.png"; // Set source path

const health = [];
let ystarthealth = player1.y + 30 + 2
let xstarthealth = leftborder + 30 + 7.5
for (let i = 0; i < playerhealth; i++){
    let hblock = new healthblock(58,22,xstarthealth,ystarthealth+i*26,"red")
    health.push(hblock)
}
function healthupdate(){
    for (i = 0; i < health.length; i++ ){
        if (health[i]){

            health[i].draw()
        }
    }


    if (playerhealth == 0 ){
        for (let i = 0; i < blocks.length; i++){
            if (blocks[i]) {
                blocks[i].hit = false
                playerhealth = 5
            }
        }
        for(let i = 0; i< health.length; i++) {
            health[i].used = false
        }
    }
}
let score = 0
function ballcheck() {
    for (let i = 0; i < blocks.length; i++) {
        let ballx = ball.x
        let bally = ball.y
        if (ballx + ball.radie >= blocks[i].x && ballx + ball.radie <= blocks[i].x + blocks[i].width && bally + ball.radie >= blocks[i].y && bally - ball.radie <= blocks[i].y + blocks[i].height){
            if (blocks[i].hit == false) {
                blocks[i].hit = true
                if (blocks[i].color == "white") {
                    score = score + 50
                }
                if (blocks[i].color == "orange") {
                    score = score + 60
                }
                if (blocks[i].color == "cyan") {
                    score = score + 70
                }
                if (blocks[i].color == "green") {
                    score = score + 80
                }
                if (blocks[i].color == "red") {
                    score = score + 90
                }
                if (blocks[i].color == "pink") {
                    score = score + 110
                }
                if (blocks[i].color == "yellow") {
                    score = score + 120
                }
                if (ballx + ball.radie <= blocks[i].x && ballx - ball.radie >= blocks[i].x - ball.radie *2 || ballx - ball.radie >= blocks[i].x && ballx + ball.radie <= blocks[i].x + ballx + ball.radie ) {
                    console.log("Test2")
                    ball.yvelocity = -ball.yvelocity
                } else {
                    console.log("Test")
                    ball.yvelocity = -ball.yvelocity
                    ball.xvelocity = -ball.xvelocity
                }
                
            }
        }
        u++
    }

    if (ball.x + ball.radie >= player1.x && ball.x + ball.radie <= player1.x + 148 && ball.y + ball.radie >= player1.y && ball.y + ball.radie <= player1.y + player1.height){
        
        ball.yvelocity = -ball.yvelocity
        if (ball.xvelocity == 0 ) {
            let r = Math.random(0,1)
            let f = Math.random(0.5,1.25)
            ball.xvelocity = r > 0.5 ? f : -f

        } else {
            if (ball.xvelocity < 10 && ball.xvelocity > -10 ){
                ball.xvelocity = ball.xvelocity*1.1
            }
        }
    }
    if (ball.x - ball.radie <= leftborder) {
        ball.xvelocity = -ball.xvelocity
    }
    if (ball.x + ball.radie >= actualrightborder) {
        ball.xvelocity = -ball.xvelocity
    }
    if (ball.y - ball.radie >= 20 && ball.y + ball.radie <= 20+ ball.radie*2) {
        ball.yvelocity = -ball.yvelocity
    }
    if (ball.y + ball.radie >= 1000) {
        ball.y = player1.y -200
        ball.x = player1.x + 74
        ball.xvelocity = 0
        ball.yvelocity = 0.75
        playerhealth = playerhealth - 1
        for(let i = 0; i < health.length; i++){
            if (health[i].used == false){
                health[i].used = true
                break
            }
        }
    }
}

function ScoreText(){
    ctx.font = "50px 8514oem";
    ctx.fillStyle = "white"
    var scoremessage = score
    ctx.fillText(scoremessage, leftborder + 20, 100);
}

for (let i = 0; i < blocks.length; i++) console.log(blocks[i])

let menuseleted = 0  
let playing = false
let menu = true
let powerups = false
let info = false

// MENU SELECTER
document.addEventListener('keydown', (event) => {
    var name = event.key;
    if (name == "ArrowDown"){
        if (menu == true && menuseleted < 2){
            menuseleted += 1
            console.log(menuseleted)
        }else{
            menuseleted = 0
        }
    }
    if (name == "ArrowUp"){
        if (menu == true && menuseleted >= 0 ){
            menuseleted = menuseleted - 1
            console.log(menuseleted)
        }else{
            menuseleted = 0
        }
    }
    if (name == "Enter"){
        if (menu == true ){
            if (menuseleted == 0 ){
                playing = true
                menu = false
                powerups = false
                info = false
            }
            if (menuseleted == 1 ){
                playing = false
                menu = false
                powerups = true
                info = false
            }
            if (menuseleted == 2 ){
                playing = false
                menu = false
                powerups = false
                info = true
            }
        }
    }
    if (name == "Escape"){
        playing = false
                menu = true
                powerups = false
                info = false
    }
  }, false);

  function blockdraw(){
    for (let i = 0; i < blocks.length; i++) {
        blocks[i].draw()
    }
  }

let timeperframe = 1.35
function update(){
    timeperframe = Date.now()
    if (playing == true ){
        window.requestAnimationFrame(update)
        ctx.fillStyle = '#F5850E';
        ctx.fillRect(xwidth, 0, width, height);
        ctx.drawImage(img,xwidth - 23,0)
        ctx.drawImage(c38, leftborder + 30, player1.y + 10)
        healthupdate()
        player1.drawImage()
        ScoreText()
        ballcheck()
        blockdraw()
        ball.update()
    }
    if (menu == true) {
        window.requestAnimationFrame(update)
        ctx.drawImage(mainmenu, leftborder - 1,0)
        ctx.drawImage(arrow,xmenuoptions[menuseleted],ymenuoptions[menuseleted])
    }
    if (info == true){
        window.requestAnimationFrame(update)
        ctx.drawImage(powerupsinfo, leftborder - 1,0)
    }
    if (powerups == true){
        window.requestAnimationFrame(update)
        ctx.drawImage(powerups, leftborder - 1,0)
    }
    timeperframe = Date.now() - timeperframe
    console.log(timeperframe)

}
update()
}
