

export default class Bullet {
  constructor(ctx, posX, posY) {
    this.ctx = ctx
    this.load = false
    this.speed = -5
    this.dead = false
    this.rect = {
      x: posX - 9,
      y: posY - 27,
      w: 18,
      h: 27
    }
    this.init()
  }
  init(){
    this.img = new Image()
    this.img.src = "public/bullet.png"
    this.img.onload = () => this.load = true
  }
  render(){
    if(this.load){
      this.ctx.drawImage(this.img, ...this.rect)
    }
  }
  update(){
    // 子弹速度
    this.speed *= 1.05
    this.rect.y += this.speed
    if(this.rect.y < 0){
      this.dead = true
    }
  }
}
