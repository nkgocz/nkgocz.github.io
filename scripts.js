// scripts.js
console.log("JavaScript Loaded!"); // 在浏览器控制台显示消息

document.addEventListener('DOMContentLoaded', function() {
  // 页面加载完成后执行的代码
  alert("welcome to Noah's Diary:D");
});

// 播放/暂停背景音乐
const bgMusic = new Audio('Bass Meant Jazz.mp3');
bgMusic.volume = 0.3; // 30%音量

function toggleMusic() {
  if(bgMusic.paused) {
    bgMusic.play();
  } else {
    bgMusic.pause();
  }
}
