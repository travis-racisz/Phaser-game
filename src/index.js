import Phaser from "phaser";
import sky from "./assets/sky.png"
import ground from "./assets/platform.png"
import dude from "./assets/dude.png"
import star from "./assets/star.png"


const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create,
    update: update
},
  physics: { 
    default: "arcade",
    gravity: {y: 300}
  }
};
var game = new Phaser.Game(config);
var cursors; 
var player; 
var platforms;
var stars; 

function preload ()
{
    this.load.image('sky', sky);
    this.load.image('ground', ground);
    this.load.image('star', star);
    this.load.image('bomb', './assets/bomb.png');
    this.load.spritesheet('dude',dude,
        { frameWidth: 32, frameHeight: 48 }
    );
}


function create ()
{
  this.add.image(0, 0, 'sky').setOrigin(0,0);
  
  platforms = this.physics.add.staticGroup()
  platforms.create(400, 560, 'ground').setScale(2).refreshBody()
  platforms.create(600, 400 , "ground")
  platforms.create(50, 250, 'ground')
  platforms.create(750, 220, 'ground')

  player = this.physics.add.sprite(100, 450, 'dude')
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
  cursors = this.input.keyboard.createCursorKeys();

  // stars.body.setGravityY(300)

  stars = this.physics.add.group({
    key: "star", 
    repeat: 11, 
    setXY: {x: 10, y: 500, stepX:70}
  })

  stars.children.iterate((child) =>  
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
  )

  this.physics.add.collider(player, platforms)
  this.physics.add.collider(star, platforms)
  this.physics.add.overlap(player, star, collectStar, null, this )
}

function collectStar(player, star){
  star.disableBody(true, true)
}

 function update ()
    {
        if (cursors.left.isDown)
        {
            player.setVelocityX(-160);

            player.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);

            player.anims.play('right', true);
        }
        else
        {
            player.setVelocityX(0);

            player.anims.play('turn');
        }

        if (cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-330);
        }
    }

