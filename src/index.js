import Phaser from "phaser";
import sky from "./assets/sky.png"
import ground from "./assets/platform.png"
import dude from "./assets/dude.png"
import star from "./assets/star.png"
import bomb from './assets/bomb.png'



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
  this.load.image('sky', sky);
  this.load.image('ground', ground);
  this.load.spritesheet('dude', dude, { frameWidth: 32, frameHeight: 48 });
}

function create ()
{
  //  A simple background for our game
  this.add.image(400, 300, 'sky');

  //  The platforms group contains the ground and the 2 ledges we can jump on
  platforms = this.physics.add.staticGroup();

  //  Here we create the ground.
  //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
  platforms.create(400, 568, 'ground').setScale(2).refreshBody();

  //  Now let's create some ledges
  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');

  // The player and its settings
  player = this.physics.add.sprite(300, 70, 'dude');

  //  Player physics properties. Give the little guy a slight bounce.
  player.setBounce(1);
  player.setCollideWorldBounds(true);

  //  Our player animations, turning, walking left and walking right.
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


  //  The score
  scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

  //  Collide the player and the stars with the platforms
  this.physics.add.collider(player, platforms);

  // this.physics.add.collider(player, platforms, collectStar, null, this);
  this.physics.add.collider(player, platforms , jumpOnPlatform, null, this )

  console.log(player)
}

function update ()
{
  if(gameOver){ 
    return
  }
  if (cursors.left.isDown)
  {
      player.setVelocityX(-160);

      player.anims.play('left', true);
  }
  else if (cursors.right.isDown)
  {
      player.setVelocityX(160);

      player.anims.play('right', true);
      hitBomb()
  }
  else
  {
      player.setVelocityX(0);

      player.anims.play('turn');
  }

  if (player.body.x >= config.height)
  {
      hitBomb()
  }
}

function jumpOnPlatform (player, platform)
{
  platform.disableBody(true, true);

  //  Add and update the score
  score += 10;
  scoreText.setText('Score: ' + score);
      var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400)
      var platform = platforms.create(x, 16, 'platform');
}

function hitBomb (player)
{
  this.physics.pause();

  player.setTint(0xff0000);

  player.anims.play('turn');

  gameOver = true;
}