import './lib/prototype.js'
import status      from './utils/Status.js'
import playerEvent from "./api/event/playerEvent.js"
class Game {
  constructor(container){
    this.container = container
    this.paused = false
    this.initContainer()
    this.restartGame()
    //
    this.stop = this.stop.bind(this)
    this.run = this.run.bind(this)
  }
  // 初始化场景
  initContainer(){
    this.canvas = document.createElement("canvas")
    this.canvas.id = "canvas"
    this.setSize()
    this.canvas.style.display = "block"
    this.container.appendChild(this.canvas)
    this.ctx = this.canvas.getContext("2d")
    status.setCtx(this.ctx, this.canvas.width, this.canvas.height)
    this.basicEvent()
  }
  // 开始游戏
  restartGame(){
    cancelAnimationFrame(this.frame)
    status.restart()
    // 初始化场景初始化玩家
    // 注册到status
    this.stop()
    this.run()
    this.render()
  }
  // 渲染主函数
  render() {
    this.frame = requestAnimationFrame(this.render.bind(this))
    if(!this.paused){
      this.update()
      this.ctx.clearRect(0 ,0, this.canvas.width, this.canvas.height)

      status.render()
    }
  }
  // 数据更新模块
  update(){

    status.update()
    if(status.player.dead){
      this.paused = true
      console.log("game over")
    }
  }
  // 调整大小函数
  setSize(){
    this.canvas.width = this.container.getBoundingClientRect().width
    this.canvas.height = this.container.getBoundingClientRect().height
  }
  // 时间模块
  basicEvent(){
    window.addEventListener("resize", this.setSize.bind(this))
    // 移动端木有这个功能
    window.addEventListener("keydown", e => {
      if(this.paused) return
      if(e.key.toLowerCase() === "f"){
        status.player.fire()
      }
      // 临时 添加 敌机
      if(e.key.toLowerCase() === "k"){
        status.enemyList.forEach( enemy => enemy.kill())
      }
    })
  }
  // 暂停游戏
  stop(){
    // 关闭运动
    this.paused = true
    // 关闭事件
    status.player.handleEvent(this.canvas, "remove", playerEvent)
  }
  // 继续游戏
  run(){
    // 重启运动
    this.paused = false
    // 重启事件
    status.player.handleEvent(this.canvas, "add", playerEvent)
  }
}

export default Game
