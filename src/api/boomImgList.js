let imgList = []
for(let i = 0;i < 18;i++){
  let img = new Image()
  img.src = `public/explosion${i+1}.png`
  imgList.push(img)
}

export default imgList
