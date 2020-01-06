import status from "../utils/Status.js"
import boomImgList from "./boomImgList.js"
export default class Enemy {
  constructor(ctx) {
    this.ctx = ctx
    this.load = false
    this.speed = 3
    this.readyToDie = false
    this.count = 0
    this.dead = false
    this.rect = {
      x: Math.random() * (status.screen.w - 60),
      y: -40,
      w: 60,
      h: 39.5
    }
    this.boomImgList = boomImgList
    this.init()
  }
  init(){
    this.img = new Image()
    this.img.src = "public/enemy.png"
    this.img.onload = () => this.load = true
  }
  render(){
    if(this.load && !this.dead){
      this.ctx.drawImage(this.img, ...this.rect)
    }
  }
  update(){
    if(this.count >= this.boomImgList.length){
      this.dead = true
    }
    this.rect.y += this.speed
    if(this.readyToDie){
      this.img = this.boomImgList[this.count++]
      return
    }
    if(this.rect.y > status.screen.h){
      this.dead = true
    }
  }
  kill(){
    this.readyToDie = true
    // 先播放死亡动画, 1s之后dead改成 true
  }
}
