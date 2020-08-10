import Phaser from "phaser";
import logoImg from "./assets/logo.png";
import sky from "./assets/sky.png"
import ground from "./assets/platform.png"
import dude from "./assets/dude.png"



const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create
  },
  physics: { 
    default: "arcade",
    gravity: {y: 300}
  }
};
var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('sky', sky);
    this.load.image('ground', ground);
    this.load.image('star', './assets/star.png');
    this.load.image('bomb', './assets/bomb.png');
    this.load.spritesheet('dude',dude,
        { frameWidth: 32, frameHeight: 48 }
    );
}


function create ()
{
  this.add.image(0, 0, 'sky').setOrigin(0,0);
  
  const platforms = this.physics.add.staticGroup()
  platforms.create(400, 560, 'ground').setScale(2).refreshBody()
  platforms.create(600, 400 , "ground")
  platforms.create(50, 250, 'ground')
  platforms.create(750, 220, 'ground')

  let player = this.physics.add.sprite(100, 450, 'dude')
  player.setBounce(.3)
  player.setCollideWorldBounds(true)
  player.body.setGravityY(300)

  this.anims.create({ 
    key:'left', 
    frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
    frameRate: 10,
    repeat: -1
  })
   this.anims.create({ 
     key: "right", 
     frames: this.anims.generateFrameNumbers('dude', {start: 5 , end:8}),
     frameRate: 10, 
     repeat: -1
   })
  this.anims.create({ 
    key: 'turn',
    frames: this.anims.generateFrameNumbers('dude', {start: 4}),
    frameRate: 20, 
  })
}

function update(){ 

}
