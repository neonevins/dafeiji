import status from "../utils/Status.js"
import boomImgList from "./boomImgList.js"
export default class Player {
  constructor(ctx){
    this.ctx = ctx
    this.load = false
    this.drag = false
    this.readyToDie = false
    this.boomImgList = boomImgList
    this.count = 0
    this.timer = null
    this.rect = {
      x: status.screen.w / 2 - 35,
      y: status.screen.h - 35,
      w: 70,
      h: 70
    }
    this.init()
  }
  init(){
    this.img = new Image()
    this.img.src = "public/hero.png"
    this.img.onload = () => this.load = true
    clearInterval(this.timer)
    this.timer = setInterval(() => {
      this.fire()
    }, 300)
  }
  render(){
    if(this.load){
      this.ctx.drawImage(this.img, ...this.rect)
    }
  }
  update(){
    // 维护rect位置的正确性
    if(this.rect.x < 0 ) this.rect.x = 0
    if(this.rect.y < 0 ) this.rect.y = 0
    if(this.rect.x + this.rect.w > status.screen.w){
      this.rect.x = status.screen.w - this.rect.w
    }
    if(this.rect.y + this.rect.h > status.screen.h){
      this.rect.y = status.screen.h - this.rect.h
    }
    // 死亡跳转
    if(this.count >= this.boomImgList.length){
      this.dead = true
      return
    }
    // 处理死亡
    if(this.readyToDie){
      this.img = this.boomImgList[this.count++]
    }
  }
  /**
   * 处理事件的监听或者取消
   * @param {String}type["add", "remove"] 事件的类型
   * @param {Node}target 事件的类型
   * @param {Object}eventPlugin 事件的配置表
   */
  handleEvent(target, type, eventPlugin){
    // eventPlugin
    eventPlugin.forEach(method => {
      method.handleList.forEach( fn => {
        target[type+"EventListener"](method.type, fn.onceBind(this))
      })
    })
  }
  fire(){
    status.fire({
      x: this.rect.x + this.rect.w / 2,
      y: this.rect.y + this.rect.h / 2
    })
  }

  kill(){
    this.readyToDie = true
  }
}
