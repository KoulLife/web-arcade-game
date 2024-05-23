window.addEventListener('keydown', (event) => {
  if (player.preventInput) return
  switch (event.key){
    case 'w':
      for (let i = 0; i < doors.length; i++){
        const door = doors[i]
        if(
          player.hitbox.position.x + player.hitbox.width <=
          door.position.x + door.width &&
          player.hitbox.position.x >= door.position.x &&
          player.hitbox.position.y + player.hitbox.height >= door.position.y &&
          player.hitbox.position.y <= door.position.y + door.height
        ){
          player.velocity.x = 0
          player.velocity.y = 0
          player.preventInput = true
          player.switchSprite('enterDoor')
          return
        }
      }

      if(player.velocity.y === 0) player.velocity.y = -20
      break

    case 'a':
      keys.a.pressed = true
      break

    case 'd':
      keys.d.pressed = true
      break
  }
})

// 키보드에서 손을 땔 경우 player가 멈춤
window.addEventListener('keyup', (event) => {
  switch (event.key){
    case 'a':
      keys.a.pressed = false
      break

    case 'd':
      keys.d.pressed = false
      break
  }
})