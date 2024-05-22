class Player{
  constructor({collisionBlocks = [], imageSrc, frameRate = 1}) {
    this.position = {
      x: 200,
      y: 200,
    }
    this.sides = {
      bottom: this.position.y + this.height,
    }
    this.velocity = {
      x: 0,
      y: 0,
    }
    this.gravity = 1
    this.collisionBlocks = collisionBlocks

    // Sprite
    this.image = new Image()
    this.image.onload = () => {
      this.loaded = true
      this.width = this.image.width / this.frameRate
      this.height = this.image.height
    }
    this.image.src = imageSrc
    this.loaded = false
    this.frameRate = frameRate
    this.currentFrame = 0
    this.elapsedFrames = 0
    this.frameBuffer = 2
  }

  draw(){
    // c.fillStyle = 'red'
    // c.fillRect(this.position.x, this.position.y, this.width, this.height)

    if (!this.loaded) return
    const cropbox = {
      position: {
        x: this.width * this.currentFrame,
        y: 0,
      },
      width: this.width,
      height: this.height
    }

    c.drawImage(
      this.image,
      cropbox.position.x,
      cropbox.position.y,
      cropbox.width,
      cropbox.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height,
    )
    this.updateFrames()
  }

  updateFrames(){
    this.elapsedFrames++

    if (this.elapsedFrames % this.frameBuffer === 0){
      if (this.currentFrame < this.frameRate - 1) this.currentFrame++
      else this.currentFrame = 0
    }
  }

  update(){
    this.position.x += this.velocity.x

    this.updateHitbox()
    this.checkForHorizontalCoolisions() // Check for horizontal collisions
    this.applyGravity() // Apply gravity
    this.updateHitbox()
    this.checkForVerticalCollisions() // Check for vertical collisions
  }

  updateHitbox(){
    this.hitbox = {
      position: {
        x: this.position.x + 58,
        y: this.position.y + 34,
      },
      width: 50,
      height: 53,
    }
  }

  checkForHorizontalCoolisions(){
    for(let i = 0; i < this.collisionBlocks.length; i++){
      const collisionBlock = this.collisionBlocks[i]

      // If a collision exists
      if(
        this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
        this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
        this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
        this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height
      ){
        if (this.velocity.x < 0){
          const offset = this.hitbox.position.x - this.position.x
          this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01
          break
        }
        if (this.velocity.x > 0){
          const offset = this.hitbox.position.x - this.position.x + this.hitbox.width
          this.position.x = collisionBlock.position.x - offset - 0.01
          break
        }
      }
    }
  }

  applyGravity(){
    this.velocity.y += this.gravity
    this.position.y += this.velocity.y
  }

  checkForVerticalCollisions(){
    for(let i = 0; i < this.collisionBlocks.length; i++){
      const collisionBlock = this.collisionBlocks[i]

      // If a collision exists, this.velocity.y = 0 --> 가다가 땅에 떨어지는 것을 방지
      if(
        this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
        this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
        this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
        this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height
      ){
        if (this.velocity.y < 0){
          this.velocity.y = 0
          const offset = this.hitbox.position.y - this.position.y
          this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01
          break
        }
        if (this.velocity.y > 0){
          this.velocity.y = 0
          const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
          this.position.y = collisionBlock.position.y - offset - 0.01
          break
        }
      }
    }
  }
}