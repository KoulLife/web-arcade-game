class Player{
  constructor() {
    this.position = {
      x: 100,
      y: 100,
    }
    this.width = 100
    this.height = 100
    this.sides = {
      bottom: this.position.y + this.height,
    }
    this.velocity = {
      x: 0,
      y: 0,
    }
    this.gravity = 1
  }

  draw(){
    c.fillStyle = 'red'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

  update(){
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    this.sides.bottom = this.position.y + this.height

    // above bottom of canvas
    if (this.sides.bottom + this.velocity.y < canvas.height){
      this.velocity.y += this.gravity
      // this.sides.bottom = this.position.y + this.height --> w를 눌렀을 경우 바닥 아래로 내려가는 이슈가 생김
    }else this.velocity.y = 0
  }
}