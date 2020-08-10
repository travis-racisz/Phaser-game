import Phaser from "phaser";
import sky from "./assets/sky.png"
import ground from "./assets/platform.png"
import dude from "./assets/dude.png"
import nightsky from "./assets/nightsky.png"



var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 300 },
          debug: false
      }
  },
  scene: {
      preload: preload,
      create: create,
      update: update
  }
};

var player;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;


var game = new Phaser.Game(config);

function preload ()
{
  console.log(config)
  this.load.image('sky', nightsky);
  this.load.image('ground', ground);
  this.load.spritesheet('dude', dude, { frameWidth: 32, frameHeight: 48 });
}

function create ()
{
  this.add.image(400, 300, 'sky');


  platforms = this.physics.add.staticGroup();


  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');


  player = this.physics.add.sprite(300, 70, 'dude');

  player.setBounce(1);
  player.setCollideWorldBounds(true);

  this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
  });

  this.anims.create({
      key: 'turn',
      frames: [ { key: 'dude', frame: 4 } ],
      frameRate: 20
  });

  this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
  });

  cursors = this.input.keyboard.createCursorKeys();



  scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#fff' });

  // this.physics.add.collider(player, platforms);

  // this.physics.add.collider(player, platforms, collectStar, null, this);
  this.physics.add.collider(player, platforms , jumpOnPlatform(player, platforms), null, this )

  
  console.log(game, 111)
  console.log(platforms)
}

function update ()
{
  if(gameOver){ 
    scoreText.setText('GameOver');
    return
  }
  if (cursors.left.isDown)
  {
      player.setVelocityX(-160);
      console.log(player.y)
      player.anims.play('left', true);
  }
  else if (cursors.right.isDown)
  {
      player.setVelocityX(160);

      player.anims.play('right', true);
      // hitBomb()
  }
  else
  {
      player.setVelocityX(0);

      player.anims.play('turn');
  }

  if (player.y > 550)
  {
      hitBottom(player)
  }
}

function jumpOnPlatform (player, platform)
{
  // platform.disableBody(true, true);
  score += 10;
  scoreText.setText('Score: ' + score);
      var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400)
      platform = platforms.create(x, 16, 'ground');
}

function hitBottom (player)
{
  console.log(player)
  player.setTint('0xff0000');

  player.anims.play('turn');

  this.physics.pause();


  gameOver = true;
}