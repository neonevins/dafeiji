/**
 * 修改对象原型 方便对象解构
 * @returns {IterableIterator<*>}
 */
Object.prototype[Symbol.iterator] = function*(){
  for(let i in this){
    yield this[i]
  }
}
/**
 * 函数原型上添加一个一次性bind的方法, 避免多次绑定带来的麻烦
 * @type {Function}
 */
Function.prototype.onceBind = (function(){
  window.bindList = new Map
  return function(obj, ...rest){
    // 如果这个函数没有onceBind过
    if(!bindList.get(this)){
      let map = new Map()
      map.set(obj, this.bind(obj, ...rest))
      bindList.set(
        this,
        map
      )
      return bindList.get(this).get(obj)
    }
    let map = bindList.get(this)
    // 没有对这个对象设置过
    if(!map.get(obj)){
      map.set(obj, this.bind(obj, ...rest))
    }
    // 设置过这个对象的属性
    return bindList.get(this).get(obj)
  }
})();
