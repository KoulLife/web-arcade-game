window.addEventListener('keydown', (event) => {
  console.log(event)
  switch (event.key){
    case 'w':
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