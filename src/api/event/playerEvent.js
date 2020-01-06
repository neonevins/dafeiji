import {rectCollide} from '../../utils/tools.js'
export default [
  {
    type: "touchstart",
    handleList: [
      function(e){
        const mouseRect = {
          x: e.touches[0].clientX - 5,
          y: e.touches[0].clientY - 5,
          w: 10,
          h: 10
        }
        // 是否碰撞
        let result = rectCollide(mouseRect, this.rect)
        if(result){
          this.drag = true
        }
      }
    ],
  },
  {
    type: "touchmove",
    handleList: [
      function (e) {
        if(this.drag === true){
          this.rect.x = e.touches[0].clientX - this.rect.w / 2
          this.rect.y = e.touches[0].clientY - this.rect.h / 2
        }
      }
    ]
  },
  {
    type: "touchend",
    handleList: [
      function (e) {
        this.drag = false
      }
    ]
  }
]
