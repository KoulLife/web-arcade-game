const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 64 * 16
canvas.height = 64 * 9

const parsedCollisions = collisionsLevel1.parse2D()
  const collisionBlocks = parsedCollisions.createObjectsFrom2D()

const backgroundLevel1 = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: './img/backgroundLevel1.png',
})

// Player 클래스 생성
const player = new Player({
  collisionBlocks,
  imageSrc: './img/king/idle.png',
  frameRate: 11,
  animations: {
    idleRight: {
      frameRate: 11,
      frameBuffer: 2,
      loop: true,
      imageSrc: './img/king/idle.png'
    },
    idleLeft: {
      frameRate: 11,
      frameBuffer: 2,
      loop: true,
      imageSrc: './img/king/idleLeft.png'
    },
    runRight: {
      frameRate: 8,
      frameBuffer: 4,
      loop: true,
      imageSrc: './img/king/runRight.png'
    },
    runLeft: {
      frameRate: 8,
      frameBuffer: 4,
      loop: true,
      imageSrc: './img/king/runLeft.png',
      image: new Image()
    },
  }
})

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
}

function animate(){
  window.requestAnimationFrame(animate)

  backgroundLevel1.draw()
  collisionBlocks.forEach((collisionBlocks) => {
    collisionBlocks.draw()
  })

  player.velocity.x = 0
  if(keys.d.pressed) {
    player.switchSprite('runRight')
    player.velocity.x = 5
    player.lastDirections = 'right'
  } else if(keys.a.pressed) {
    player.switchSprite('runLeft')
    player.velocity.x = -5
    player.lastDirections = 'left'
  }
  else {
    if (player.lastDirections === 'left') player.switchSprite('idleLeft')
    else player.switchSprite('idleRight')
  }


  player.draw()
  player.update()
}

animate()