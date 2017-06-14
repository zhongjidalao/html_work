
var urls = {
  "github": "https://github.com/zhongjidalao/", 
  "zhihu": "https://www.zhihu.com/people/madandan/activities",
  "twitter": "https://github.com/zhongjidalao",
  "facebook": "https://www.zhihu.com/people/madandan/activities",
  "github_blog": "https://twitter.com/zhongjidalao",
  "voxel": "https://www.facebook.com/profile.php?id=100014584084827",
  "voxelcreator": "https://github.com/zhongjidalao/blog",
  "three": "http://voxeljs.com/"
}

var slides = Object.keys(urls)

var game = require('voxel-hello-world')({
  texturePath: "./images/",
  materials: [['grass', 'dirt', 'grass_dirt'], 'brick', 'dirt'].concat(slides),
  materialFlatColor: false,
  playerSkin: "./images/player.png",
  // materials: ["yellow"].concat(slides),
  generateVoxelChunks: false,
  chunkDistance: 1
})

var z = -5
var y = 3
slides.map(function(slide) {
  game.setBlock([0, y, z], slide)
  z += 2
  if (z > 5) {
    z = -5
    y += 2
  }
})

game.on('setBlock', function(pos, val, old) {
  if (old === 1 || val === 1) return
  var url = urls[slides[old - 2]]
  var win = window.open(url)
})

game.interact.on('release', function() { game.paused = true })
game.interact.on('attain', function() { game.paused = false })

window.game = game