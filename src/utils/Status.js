import Bullet        from "../api/Bullet.js"
import Enemy         from "../api/Enemy.js"
import Background    from "../api/Background.js"
import Player        from "../api/Player.js"
import {rectCollide} from '../utils/tools.js'
export default new class Status {
  constructor(){
    this.screen = {
      w: 0,
      h: 0
    }

  }
  setCtx(ctx, w, h){
    this.ctx = ctx
    this.screen.w = w
    this.screen.h = h
  }
  restart(){
    this.bulletList = [] // 子弹素组
    this.enemyList = []
    this.player = new Player(this.ctx)
    this.bg = new Background(this.ctx)
  }
  // 子弹逻辑
  fire(pos){
    this.bulletList.push(new Bullet(this.ctx, ...pos))
  }

  createEnemy(){
    this.enemyList.push(new Enemy(this.ctx, this.bg.rect.w))
  }

  render(){
    // 渲染背景
    this.bg.render(...this.screen)
    this.player.render()
    // 随机生成敌机 Enemy
    if(Math.random() < 0.03) this.createEnemy()

    this.bulletList.forEach(bullet => {
      bullet.render()
    })
    this.enemyList.forEach( enemy => {
      enemy.render()
    })
  }
  update(){
    this.bg.update()
    this.player.update()
    // 子弹更新
    this.bulletList.forEach(bullet => {
      bullet.update()
      // 在子弹里面判断与每一个敌机的碰撞关系
      this.enemyList.forEach(enemy => {
        if(rectCollide(enemy.rect, bullet.rect)){
          enemy.kill()
          bullet.dead = true
        }
      })
    })

    // 敌机更新
    this.enemyList.forEach( enemy => {
      enemy.update()
      if(rectCollide(enemy.rect, this.player.rect)){
        this.player.kill()
      }
    })

    // 删除死掉的子弹
    this.bulletList = this.bulletList.filter(bullet => !bullet.dead)

    // 删除死掉的敌机
    this.enemyList = this.enemyList.filter(enemy => !enemy.dead)

  }
}
