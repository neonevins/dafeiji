export default class Background {
  constructor(ctx){
    this.ctx = ctx
    this.imgList = []
    this.loaded = false
    this.rect = {
      x: 0,
      y: 0,
      w: 0,
      h: 0
    }
    this.init()
  }
  init(){
    this.imgList.push(new Image())
    this.imgList.push(new Image())
    this.imgList.forEach(img => {
      img.src = "public/bg.jpg"
      img.onload = () => {
        this.loaded = true
      }
    })
  }
  render(w, h){
    this.rect.w = w
    this.rect.h = h
    if(this.loaded){
      this.ctx.drawImage(this.imgList[0], ...this.rect)
      this.ctx.translate(0, -this.rect.h)
      this.ctx.drawImage(this.imgList[1], ...this.rect)
      this.ctx.translate(0, this.rect.h)
    }
  }
  update(){
    this.rect.y += 2
    if(this.rect.y > this.rect.h){
      this.rect.y = 0
    }
  }
}
