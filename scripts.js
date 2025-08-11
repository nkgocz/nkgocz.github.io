// scripts.js
console.log("JavaScript Loaded!"); // 在浏览器控制台显示消息

document.addEventListener('DOMContentLoaded', function() {
  // 页面加载完成后执行的代码
  alert("welcome to Noah's Diary:D");
});

// 音乐播放器功能
let audioPlayer;
let isMusicPlaying = false;
let isPlayerVisible = false;

// 初始化音乐播放器
function initMusicPlayer() {
  audioPlayer = new Audio('Bass Meant Jazz.mid');
  audioPlayer.volume = 0.3; // 默认音量30%
  audioPlayer.loop = true;
  
  // 创建首次交互后自动播放的逻辑
  const playOnInteraction = () => {
    if (!isMusicPlaying) {
      audioPlayer.play().then(() => {
        isMusicPlaying = true;
        document.querySelector('.retro-btn').textContent = '⏸ Pause';
      }).catch(e => console.log(e));
    }
    document.removeEventListener('click', playOnInteraction);
    document.removeEventListener('keydown', playOnInteraction);
  };
  
  document.addEventListener('click', playOnInteraction);
  document.addEventListener('keydown', playOnInteraction);
  
  // 使窗口可拖动
  makeDraggable(document.getElementById('musicPlayer'), 
                document.querySelector('.retro-title-bar'));
}

// 切换播放/暂停
function togglePlay() {
  if (isMusicPlaying) {
    audioPlayer.pause();
    document.querySelector('.retro-btn').textContent = '▶️ Play';
  } else {
    audioPlayer.play();
    document.querySelector('.retro-btn').textContent = '⏸ Pause';
  }
  isMusicPlaying = !isMusicPlaying;
}

// 停止音乐
function stopMusic() {
  audioPlayer.pause();
  audioPlayer.currentTime = 0;
  document.querySelector('.retro-btn').textContent = '▶️ Play';
  isMusicPlaying = false;
}

// 设置音量
function setVolume(vol) {
  audioPlayer.volume = vol;
}

// 切换播放器显示/隐藏
function toggleMusicPlayer() {
  const player = document.getElementById('musicPlayer');
  isPlayerVisible = !isPlayerVisible;
  player.style.display = isPlayerVisible ? 'block' : 'none';
}

// 使元素可拖动
function makeDraggable(element, handle) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  
  handle.onmousedown = dragMouseDown;
  
  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }
  
  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    element.style.top = (element.offsetTop - pos2) + "px";
    element.style.left = (element.offsetLeft - pos1) + "px";
  }
  
  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// 页面加载完成后初始化
window.onload = function() {
  initMusicPlayer();
  // 默认显示播放器
  toggleMusicPlayer();
};
